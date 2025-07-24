# import re
# import json
# from json5 import loads as json5_loads


# def get_path_center(d):
#     # Initialize current position
#     cur_x, cur_y = None, None
#     xs, ys = [], []

#     # Tokenize command + values: commands are letters, numbers follow
#     tokens = re.findall(r'([MLHVZmlhvz])|([-+]?\d*\.?\d+)', d)
    
#     cmd = None
#     idx = 0
#     while idx < len(tokens):
#         if tokens[idx][0]:
#             cmd = tokens[idx][0].upper()
#             idx += 1
#             continue
#         val = float(tokens[idx][1])
#         if cmd == 'M' or cmd == 'L':
#             # Expect two numbers x,y
#             x = val
#             y = float(tokens[idx+1][1])
#             xs.append(x)
#             ys.append(y)
#             cur_x, cur_y = x, y
#             idx += 2
#         elif cmd == 'H':
#             # Horizontal line to x, y stays the same
#             x = val
#             if cur_y is not None:
#                 xs.append(x)
#                 ys.append(cur_y)
#             cur_x = x
#             idx += 1
#         elif cmd == 'V':
#             # Vertical line to y, x stays the same
#             y = val
#             if cur_x is not None:
#                 xs.append(cur_x)
#                 ys.append(y)
#             cur_y = y
#             idx += 1
#         else:
#             # Other commands or Z: skip value
#             idx += 1
    
#     if not xs or not ys:
#         return None, None
#     return (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2



# with open("Manchester-United.tsx", "r") as f:
#     tsx = f.read()

# # Extract the array from the export
# match = re.search(r'MANCHESTER_UNITED_GROUND\s*:\s*SeatSection\[\]\s*=\s*(\[.*?\]);', tsx, re.DOTALL)
# if not match:
#     raise ValueError("Could not find LIVERPOOL_GROUND array in Liverpool.tsx")

# json_text = match.group(1)

# # Fix trailing commas
# json_text = re.sub(r',(\s*[}\]])', r'\1', json_text)

# # Fix + signs in numbers inside "d" strings (SVG allows, JSON does not)
# json_text = re.sub(r'("d"\s*:\s*")([^"]+)"', lambda m: f'"d": "{re.sub(r"\\+([0-9.])", r"\\1", m.group(2))}"', json_text)

# # Load the array using json5
# sections = json5_loads(json_text)

# # Optionally process each path to add textX, textY, etc.
# for section in sections:
#     if section.get("type") == "path" and "d" in section:
#         textX, textY = get_path_center(section["d"])
#         if textX is not None and textY is not None:
#             section["textX"] = round(textX, 3)
#             section["textY"] = round(textY, 3)
#             section["textColor"] = "white"
#             section["fontSize"] = 14.0


# # Save to JSON file
# with open("Manchester_united_cleaned.json", "w") as f:
#     json.dump(sections, f, indent=2)

# print("✅ Successfully wrote to Liverpool_cleaned.json")










import json

def transform_svg_to_desired_format(input_file, output_file):
    """
    Transforms the extracted SVG JSON data into the desired format.
    """
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: The file '{input_file}' was not found.")
        return
    except json.JSONDecodeError:
        print(f"Error: Failed to parse JSON from '{input_file}'.")
        return

    transformed_data = []

    for item in data:
        transformed_item = {
            "type": item.get("type"),
            "fill": item.get("fill"),
            "id": item.get("id", None),
            "name": item.get("text", None),
            "shape_class": " ".join(item.get("class", [])),
            "g_parent_class": None,  # Add parent class if applicable
            "textX": None,
            "textY": None,
            "textColor": item.get("fill", "black"),
            "fontSize": float(item.get("font-size", 14.0)),
            "textRotation": None
        }

        # Handle position and transformation for text elements
        if item["type"] == "text":
            transformed_item["textX"] = float(item.get("x", 0)) if item.get("x") else None
            transformed_item["textY"] = float(item.get("y", 0)) if item.get("y") else None
            transformed_item["textRotation"] = None
            if item.get("transform"):
                transformed_item["textRotation"] = extract_rotation_from_transform(item["transform"])

        # Handle other shapes (rect, path, etc.)
        if item["type"] == "rect":
            transformed_item["x"] = float(item.get("x", 0))
            transformed_item["y"] = float(item.get("y", 0))
            transformed_item["width"] = float(item.get("width", 0))
            transformed_item["height"] = float(item.get("height", 0))
        elif item["type"] == "path":
            transformed_item["d"] = item.get("d")

        transformed_data.append(transformed_item)

    # Save the transformed data to the output file
    try:
        with open(output_file, 'w', encoding='utf-8') as outfile:
            json.dump(transformed_data, outfile, indent=2)
        print(f"Successfully transformed data to '{output_file}'")
    except IOError:
        print(f"Error: Could not write to file '{output_file}'.")

def extract_rotation_from_transform(transform):
    """
    Extracts rotation value from the transform attribute.
    """
    import re
    match = re.search(r'rotate\(([-?\d.]+)', transform)
    if match:
        try:
            return float(match.group(1))
        except ValueError:
            return None
    return None

# --- How to use the script ---
if __name__ == "__main__":
    input_file = "manchester-united-extracted.json"
    output_file = "manchester-united-transformed.json"
    transform_svg_to_desired_format(input_file, output_file)