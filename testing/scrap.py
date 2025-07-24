














import json
from bs4 import BeautifulSoup
import re

def extract_all_svg_shapes(html_file_path, output_file_path="all_svg_shapes_data.json"):
    """
    Reads an HTML file, extracts data from all SVG shape elements (rect, path, circle, etc.),
    and saves it to a JSON file. It attempts to associate each shape with text for its ID/name,
    and includes all specified attributes.

    Args:
        html_file_path (str): The path to the input HTML file (e.g., 'all.html').
        output_file_path (str): The path where the JSON output will be saved.
    """
    try:
        with open(html_file_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
    except FileNotFoundError:
        print(f"Error: The file '{html_file_path}' was not found.")
        return

    soup = BeautifulSoup(html_content, 'html.parser')
    all_extracted_data = []
    shape_counter = 0 # Used for generating unique IDs if needed

    # Find all common SVG shape elements in the entire document
    all_shape_elements = soup.find_all(['rect', 'path', 'circle', 'ellipse', 'polygon', 'polyline', 'line'])

    for shape_element in all_shape_elements:
        item_data = {}
        item_data["type"] = shape_element.name # 'rect', 'path', etc.
        item_data["fill"] = shape_element.get('fill', 'none') # Default fill if not specified

        # --- Copy all attributes from the shape element ---
        for attr, value in shape_element.attrs.items():
            # Exclude 'id' and 'class' as they are handled separately or added later
            if attr not in ['fill', 'id', 'class']:
                try:
                    # Attempt to convert numeric attributes to float
                    item_data[attr] = float(value)
                except ValueError:
                    item_data[attr] = value

        # --- Initialize text-related properties ---
        text_content_for_id_name = None
        text_x = None
        text_y = None
        text_color = None
        font_size = None
        text_rotation = None

        # Look for a text element within the same parent <g> element as the shape
        parent_g = shape_element.find_parent('g')
        if parent_g:
            # Find all text elements within the parent group
            text_elements_in_group = parent_g.find_all('text')
            for found_text_element in text_elements_in_group:
                current_text = None
                
                # Check for tspan content first
                tspan_element = found_text_element.find('tspan')
                if tspan_element and tspan_element.string:
                    current_text = tspan_element.string.strip()
                elif found_text_element.string: # Fallback to text element content
                    current_text = found_text_element.string.strip()

                if current_text: # Found non-empty text, process this text element
                    text_content_for_id_name = current_text

                    # Extract transform values (translate and rotate)
                    text_transform = found_text_element.get('transform')
                    if text_transform:
                        # Prioritize translate values for textX and textY if present
                        translate_match = re.search(r'translate\(([-?\d.]+)\s*([-?\d.]+)\)', text_transform)
                        if translate_match:
                            try:
                                text_x = float(translate_match.group(1))
                                text_y = float(translate_match.group(2))
                            except ValueError:
                                pass # Keep as None if parsing fails
                        else:
                            # If no translate, check x and y on tspan or text element
                            if tspan_element and tspan_element.get('x'):
                                try:
                                    text_x = float(tspan_element.get('x'))
                                except ValueError:
                                    pass
                            elif found_text_element.get('x'):
                                try:
                                    text_x = float(found_text_element.get('x'))
                                except ValueError:
                                    pass

                            if tspan_element and tspan_element.get('y'):
                                try:
                                    text_y = float(tspan_element.get('y'))
                                except ValueError:
                                    pass
                            elif found_text_element.get('y'):
                                try:
                                    text_y = float(found_text_element.get('y'))
                                except ValueError:
                                    pass
                    else:
                        # No transform, use x and y from tspan or text element
                        if tspan_element and tspan_element.get('x'):
                            try:
                                text_x = float(tspan_element.get('x'))
                            except ValueError:
                                pass
                        elif found_text_element.get('x'):
                            try:
                                text_x = float(found_text_element.get('x'))
                            except ValueError:
                                pass

                        if tspan_element and tspan_element.get('y'):
                            try:
                                text_y = float(tspan_element.get('y'))
                            except ValueError:
                                pass
                        elif found_text_element.get('y'):
                            try:
                                text_y = float(found_text_element.get('y'))
                            except ValueError:
                                pass

                    # Extract rotate values
                    if text_transform:
                        rotate_match = re.search(r'rotate\(([-?\d.]+)', text_transform)
                        if rotate_match:
                            try:
                                text_rotation = float(rotate_match.group(1))
                            except ValueError:
                                pass # Keep as None if parsing fails

                    # Extract text-related properties (fill and font-size)
                    text_color = found_text_element.get('fill', '#ffffff')
                    font_size_str = found_text_element.get('font-size')
                    if font_size_str:
                        try:
                            font_size = float(font_size_str)
                        except ValueError:
                            font_size = None
                    else:
                        font_size = None

                    break # Found the best text element, stop searching

        # Assign extracted text properties to item_data
        if text_x is not None:
            item_data["textX"] = text_x
        if text_y is not None:
            item_data["textY"] = text_y
        if text_color is not None:
            item_data["textColor"] = text_color
        if font_size is not None:
            item_data["fontSize"] = font_size
        if text_rotation is not None:
            item_data["textRotation"] = text_rotation

        # --- Determine ID and Name ---
        if text_content_for_id_name:
            item_data["id"] = text_content_for_id_name
            item_data["name"] = text_content_for_id_name
        elif shape_element.get('id'): # Fallback to shape's own ID
            item_data["id"] = shape_element.get('id')
            item_data["name"] = shape_element.get('id')
        elif parent_g and parent_g.get('data-id'): # Fallback to parent <g>'s data-id
            item_data["id"] = parent_g.get('data-id')
            item_data["name"] = parent_g.get('data-id')
        else: # Generate a unique ID if no natural identifier found
            shape_counter += 1
            generated_id = f"{shape_element.name}_{shape_counter}"
            item_data["id"] = generated_id
            item_data["name"] = generated_id

        # --- Add class attributes from the shape and its parent <g> (if any) ---
        shape_class = shape_element.get('class')
        if shape_class:
            item_data['shape_class'] = ' '.join(shape_class)

        if parent_g:
            g_class = parent_g.get('class')
            if g_class:
                item_data['g_parent_class'] = ' '.join(g_class)
            g_data_id = parent_g.get('data-id')
            if g_data_id:
                item_data['g_parent_data_id'] = g_data_id

        all_extracted_data.append(item_data)

    try:
        with open(output_file_path, 'w', encoding='utf-8') as outfile:
            json.dump(all_extracted_data, outfile, indent=2)
        print(f"Successfully extracted {len(all_extracted_data)} SVG shapes to '{output_file_path}'")
    except IOError:
        print(f"Error: Could not write to file '{output_file_path}'.")

# --- How to use the script ---
if __name__ == "__main__":
    # Make sure 'manchester-united.html' is in the same directory as this script, or provide the full path.
    extract_all_svg_shapes('crystal_palace_new.html', 'craystal_palace.json')





































# import json
# from bs4 import BeautifulSoup
# import re
# import math # Import math module for atan2 and degrees

# def extract_all_svg_shapes_to_flat_json(html_file_path, output_file_path="stadium_shapes_in_requested_format.json"):
#     """
#     Reads an HTML file, extracts data from all SVG shape elements (rect, path, circle, etc.),
#     associates them with text properties from their parent <g> element, and saves
#     the data to a JSON file in the flat array format as requested by the user.
#     Returns True on success, False on failure.
#     """
#     try:
#         with open(html_file_path, 'r', encoding='utf-8') as f:
#             html_content = f.read()
#     except FileNotFoundError:
#         print(f"Error: The file '{html_file_path}' was not found.")
#         return False

#     soup = BeautifulSoup(html_content, 'html.parser')
#     all_extracted_data = []
#     shape_counter = 0

#     all_shape_elements = soup.find_all(['rect', 'path', 'circle', 'ellipse', 'polygon', 'polyline', 'line'])

#     for shape_element in all_shape_elements:
#         item_data = {}
#         item_data["type"] = shape_element.name

#         # --- Copy only specific attributes from the shape element as per user's example format ---
#         if 'fill' in shape_element.attrs:
#             item_data["fill"] = shape_element.get('fill')
#         if 'd' in shape_element.attrs: # For 'path' elements
#             item_data["d"] = shape_element.get('d')
#         if 'x' in shape_element.attrs: # For 'rect' and potentially others
#             try: item_data["x"] = float(shape_element.get('x'))
#             except ValueError: item_data["x"] = shape_element.get('x')
#         if 'y' in shape_element.attrs: # For 'rect' and potentially others
#             try: item_data["y"] = float(shape_element.get('y'))
#             except ValueError: item_data["y"] = shape_element.get('y')
#         if 'width' in shape_element.attrs: # For 'rect'
#             try: item_data["width"] = float(shape_element.get('width'))
#             except ValueError: item_data["width"] = shape_element.get('width')
#         if 'height' in shape_element.attrs: # For 'rect'
#             try: item_data["height"] = float(shape_element.get('height'))
#             except ValueError: item_data["height"] = shape_element.get('height')
#         # Add more shape-specific attributes here if needed for other types (e.g., 'cx', 'cy', 'r' for circle)

#         # --- Find associated text for ID and Name, and extract text-related properties ---
#         text_content_for_id_name = None
#         text_element_to_use = None

#         parent_g = shape_element.find_parent('g')
#         if parent_g:
#             text_elements_in_group = parent_g.find_all('text')
#             for found_text_element in text_elements_in_group:
#                 current_text = None
#                 tspan_element = found_text_element.find('tspan')
#                 if tspan_element and tspan_element.string:
#                     current_text = tspan_element.string.strip()
#                 elif found_text_element.string:
#                     current_text = found_text_element.string.strip()

#                 if current_text:
#                     text_content_for_id_name = current_text
#                     text_element_to_use = found_text_element
#                     break

#         if text_element_to_use:
#             text_transform = text_element_to_use.get('transform')
            
#             # Get raw x, y from tspan or text element itself. These are relative offsets.
#             raw_text_x = 0.0
#             raw_text_y = 0.0
#             tspan_for_coords = text_element_to_use.find('tspan')
#             if tspan_for_coords:
#                 if tspan_for_coords.get('x'):
#                     try: raw_text_x = float(tspan_for_coords.get('x'))
#                     except ValueError: pass
#                 if tspan_for_coords.get('y'):
#                     try: raw_text_y = float(tspan_for_coords.get('y'))
#                     except ValueError: pass
#             elif text_element_to_use.get('x'):
#                 try: raw_text_x = float(text_element_to_use.get('x'))
#                 except ValueError: pass
#             elif text_element_to_use.get('y'):
#                 try: raw_text_y = float(text_element_to_use.get('y'))
#                 except ValueError: pass


#             matrix_parsed = False
#             if text_transform:
#                 matrix_match = re.search(r'matrix\(([^)]*)\)', text_transform)
#                 if matrix_match:
#                     try:
#                         # Extract matrix values: a b c d e f
#                         matrix_values = [float(x.strip()) for x in matrix_match.group(1).split(',') if x.strip()]
#                         if len(matrix_values) == 6:
#                             a, b, c, d, e, f = matrix_values

#                             # Apply matrix transform to raw text_x, text_y from tspan/text
#                             # This calculates the final absolute position of the text's reference point
#                             item_data["textX"] = a * raw_text_x + c * raw_text_y + e
#                             item_data["textY"] = b * raw_text_x + d * raw_text_y + f

#                             # Calculate rotation from matrix: atan2(b, a)
#                             rotation_rad = math.atan2(b, a)
#                             item_data["textRotation"] = math.degrees(rotation_rad) # Convert to degrees
#                             matrix_parsed = True
#                     except (ValueError, IndexError):
#                         pass # Keep default or None if parsing fails

#             if not matrix_parsed: # Fallback if matrix was not used or failed to parse
#                 # If no matrix, then raw_text_x and raw_text_y are directly the text's position
#                 item_data["textX"] = raw_text_x
#                 item_data["textY"] = raw_text_y

#                 if text_transform: # Check for a simple rotate() transform
#                     rotate_match = re.search(r'rotate\(([-?\d.]+)', text_transform)
#                     if rotate_match:
#                         try: item_data["textRotation"] = float(rotate_match.group(1))
#                         except ValueError: pass


#             item_data["textColor"] = text_element_to_use.get('fill', 'white')
#             font_size_str = text_element_to_use.get('font-size')
#             if font_size_str:
#                 try: item_data["fontSize"] = float(font_size_str)
#                 except ValueError: item_data["fontSize"] = None

#         # --- Determine 'id' and 'name' ---
#         if text_content_for_id_name:
#             item_data["id"] = text_content_for_id_name
#             item_data["name"] = text_content_for_id_name
#         elif shape_element.get('id'):
#             item_data["id"] = shape_element.get('id')
#             item_data["name"] = shape_element.get('id')
#         elif parent_g and parent_g.get('data-id'):
#             item_data["id"] = parent_g.get('data-id')
#             item_data["name"] = parent_g.get('data-id')
#         else:
#             shape_counter += 1
#             generated_id = f"{shape_element.name}_{shape_counter}"
#             item_data["id"] = generated_id
#             item_data["name"] = generated_id

#         # --- Add class attributes from the shape and its parent <g> (if any) ---
#         shape_class = shape_element.get('class')
#         if shape_class:
#             item_data['shape_class'] = ' '.join(shape_class)

#         if parent_g:
#             g_class = parent_g.get('class')
#             if g_class:
#                 item_data['g_parent_class'] = ' '.join(g_class)
#             g_data_id = parent_g.get('data-id')
#             if g_data_id:
#                 item_data['g_parent_data_id'] = g_data_id

#         all_extracted_data.append(item_data)

#     try:
#         with open(output_file_path, 'w', encoding='utf-8') as outfile:
#             json.dump(all_extracted_data, outfile, indent=2)
#         print(f"Successfully extracted {len(all_extracted_data)} SVG shapes to '{output_file_path}' in the specified flat format.")
#         return True
#     except IOError:
#         print(f"Error: Could not write to file '{output_file_path}'.")
#         return False

# # --- How to use the script ---
# if __name__ == "__main__":
#     json_output_filename = 'stadium_shapes_in_requested_format.json'
#     ts_output_filename = 'manchester_united_ground.ts'

#     # You can change 'all.html' to 'liverpool.html' here
#     # to process the newly uploaded file.
#     json_generation_successful = extract_all_svg_shapes_to_flat_json('manchester-united.html', json_output_filename)

#     if json_generation_successful:
#         try:
#             with open(json_output_filename, 'r', encoding='utf-8') as f:
#                 json_content = f.read()
#         except FileNotFoundError:
#             print(f"Error: JSON file '{json_output_filename}' not found after generation.")
#             exit()

#         ts_content = f"export const MANCHESTER_UNITED_GROUND: SeatSection[] = {json_content};\n"

#         try:
#             with open(ts_output_filename, 'w', encoding='utf-8') as outfile:
#                 outfile.write(ts_content)
#             print(f"Successfully exported data to '{ts_output_filename}'.")
#             print("Remember to define the 'SeatSection' interface in your TypeScript project.")
#         except IOError:
#             print(f"Error: Could not write to TypeScript file '{ts_output_filename}'.")
#     else:
#         print("JSON generation failed, skipping TypeScript export.")