import xml.etree.ElementTree as ET
import json
import uuid

SVG_NS = "http://www.w3.org/2000/svg"
ET.register_namespace('', SVG_NS)

def get_attr(el, key, default=None):
    return el.attrib.get(key, default)

def parse_rect(el):
    x = float(get_attr(el, 'x', 0))
    y = float(get_attr(el, 'y', 0))
    width = float(get_attr(el, 'width', 0))
    height = float(get_attr(el, 'height', 0))
    return f"M{x} {y} H{x+width} V{y+height} H{x} Z"

def parse_circle(el):
    cx = float(get_attr(el, 'cx', 0))
    cy = float(get_attr(el, 'cy', 0))
    r = float(get_attr(el, 'r', 0))
    return f"M {cx-r},{cy} A {r},{r} 0 1,0 {cx+r},{cy} A {r},{r} 0 1,0 {cx-r},{cy} Z"

def parse_ellipse(el):
    cx = float(get_attr(el, 'cx', 0))
    cy = float(get_attr(el, 'cy', 0))
    rx = float(get_attr(el, 'rx', 0))
    ry = float(get_attr(el, 'ry', 0))
    return f"M {cx-rx},{cy} A {rx},{ry} 0 1,0 {cx+rx},{cy} A {rx},{ry} 0 1,0 {cx-rx},{cy} Z"

def parse_polygon(el):
    points = get_attr(el, 'points', '').strip()
    return f"M{points.replace(' ', ' L')} Z" if points else None

def parse_shape(el):
    tag = el.tag.split('}')[-1]
    if tag == 'path':
        return get_attr(el, 'd')
    elif tag == 'rect':
        return parse_rect(el)
    elif tag == 'circle':
        return parse_circle(el)
    elif tag == 'ellipse':
        return parse_ellipse(el)
    elif tag == 'polygon':
        return parse_polygon(el)
    return None

def extract_text_data(el):
    text_node = el.find(f".//{{{SVG_NS}}}text")
    if text_node is None:
        return None, None, None
    x = float(get_attr(text_node, 'x', 0))
    y = float(get_attr(text_node, 'y', 0))
    value = ''.join(text_node.itertext()).strip()
    return x, y, value

def extract_shapes(svg_file):
    tree = ET.parse(svg_file)
    root = tree.getroot()

    output = []

    for g in root.findall(f".//{{{SVG_NS}}}g"):
        shape_el = next((c for c in g if c.tag.split('}')[-1] in ['path', 'rect', 'circle', 'polygon', 'ellipse']), None)
        if shape_el is None:
            continue

        d = parse_shape(shape_el)
        if d is None:
            continue

        fill = get_attr(shape_el, 'fill') or get_attr(shape_el, 'style', '').split('fill:')[-1].split(';')[0] or "#cccccc"
        id_attr = get_attr(shape_el, 'id') or str(uuid.uuid4())

        textX, textY, label = extract_text_data(g)
        text_el = g.find(f".//{{{SVG_NS}}}text")
        font_size = get_attr(text_el, 'font-size') if text_el is not None else None
        font_size = float(font_size) if font_size else 16.0


        output.append({
            "type": "path",
            "d": d,
            "fill": fill,
            "textX": textX,
            "textY": textY,
            "textColor": "white",
            "fontSize": float(font_size),
            "id": id_attr,
            "name": label or "",
            "shape_class": "block",
            "g_parent_class": "section tickets",
            "g_parent_data_id": f"S_{label}" if label else None
        })

    return output

# === Run ===
if __name__ == "__main__":
    input_svg = "sunderland_svg_map.svg"
    output_json = "sunderland_normalized.json"

    print("⏳ Processing SVG...")
    data = extract_shapes(input_svg)

    with open(output_json, "w") as f:
        json.dump(data, f, indent=2)

    print(f"✅ Saved: {output_json} with {len(data)} shapes.")
