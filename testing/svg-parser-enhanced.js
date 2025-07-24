// Enhanced version with better SVG parsing
import { DOMParser } from "xmldom";

class SVGSectionExtractor {
  constructor(svgContent) {
    this.parser = new DOMParser();
    this.doc = this.parser.parseFromString(svgContent, "text/xml");
    this.sections = [];
  }

  extractAllSections() {
    // Get all groups that contain sections
    const groups = this.doc.getElementsByTagName("g");

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      const groupId = group.getAttribute("id");

      // Look for groups that contain section elements
      if (groupId && groupId.startsWith("g") && groupId.length > 1) {
        this.processGroup(group);
      }
    }

    // Also process standalone elements
    this.processStandaloneElements();

    return this.sections;
  }

  processGroup(group) {
    const rects = group.getElementsByTagName("rect");
    const paths = group.getElementsByTagName("path");
    const texts = group.getElementsByTagName("text");

    // Extract text content from this group
    const textContent = this.extractTextFromGroup(group);

    // Process rectangles in this group
    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i];
      if (this.isSeatingSection(rect)) {
        const section = this.createSectionFromRect(rect, textContent);
        if (section) this.sections.push(section);
      }
    }

    // Process paths in this group
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      if (this.isSeatingSection(path)) {
        const section = this.createSectionFromPath(path, textContent);
        if (section) this.sections.push(section);
      }
    }
  }

  processStandaloneElements() {
    // Process elements not in specific groups
    const allRects = this.doc.getElementsByTagName("rect");
    const allPaths = this.doc.getElementsByTagName("path");

    for (let i = 0; i < allRects.length; i++) {
      const rect = allRects[i];
      if (this.isSeatingSection(rect) && !this.isAlreadyProcessed(rect)) {
        const section = this.createSectionFromRect(rect);
        if (section) this.sections.push(section);
      }
    }

    for (let i = 0; i < allPaths.length; i++) {
      const path = allPaths[i];
      if (this.isSeatingSection(path) && !this.isAlreadyProcessed(path)) {
        const section = this.createSectionFromPath(path);
        if (section) this.sections.push(section);
      }
    }
  }

  isSeatingSection(element) {
    const fill = element.getAttribute("fill");
    const style = element.getAttribute("style");

    // Check if it's a seating section based on color
    if (fill === "#72f6a6" || (style && style.includes("#72f6a6"))) {
      return true;
    }

    return false;
  }

  extractTextFromGroup(group) {
    const texts = group.getElementsByTagName("text");
    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      const content = text.textContent?.trim();
      if (content && content.match(/^[UPL]\d+$/)) {
        return {
          content,
          x: Number.parseFloat(text.getAttribute("x") || "0"),
          y: Number.parseFloat(text.getAttribute("y") || "0"),
          color: this.getTextColor(text),
          fontSize: this.getFontSize(text),
        };
      }
    }
    return null;
  }

  getTextColor(textElement) {
    const fill = textElement.getAttribute("fill");
    const style = textElement.getAttribute("style");

    if (fill) return fill;
    if (style && style.includes("fill:")) {
      const match = style.match(/fill:\s*([^;]+)/);
      if (match) return match[1].trim();
    }
    return "#ffffff";
  }

  getFontSize(textElement) {
    const fontSize = textElement.getAttribute("font-size");
    const style = textElement.getAttribute("style");

    if (fontSize) return Number.parseFloat(fontSize);
    if (style && style.includes("font-size:")) {
      const match = style.match(/font-size:\s*([^;]+)/);
      if (match) return Number.parseFloat(match[1]);
    }
    return 16.0;
  }

  createSectionFromRect(rect, textContent = null) {
    const x = Number.parseFloat(rect.getAttribute("x") || "0");
    const y = Number.parseFloat(rect.getAttribute("y") || "0");
    const width = Number.parseFloat(rect.getAttribute("width") || "0");
    const height = Number.parseFloat(rect.getAttribute("height") || "0");

    // If no text content provided, try to find nearby text
    if (!textContent) {
      textContent = this.findNearbyText(x + width / 2, y + height / 2);
    }

    if (!textContent) return null;

    return {
      type: "rect",
      fill: rect.getAttribute("fill") || "#72f6a6",
      x: x,
      y: y,
      width: width,
      height: height,
      textX: x + width / 2,
      textY: y + height / 2,
      textColor: textContent.color,
      fontSize: textContent.fontSize,
      id: rect.getAttribute("id") || this.generateId(),
      name: textContent.content,
      shape_class: "block",
      g_parent_class: this.determineParentClass(textContent.content),
      g_parent_data_id: this.determineSectionId(textContent.content),
    };
  }

  createSectionFromPath(path, textContent = null) {
    const d = path.getAttribute("d");
    if (!d) return null;

    const bbox = this.calculatePathBoundingBox(d);

    if (!textContent) {
      textContent = this.findNearbyText(bbox.centerX, bbox.centerY);
    }

    if (!textContent) return null;

    return {
      type: "path",
      fill: path.getAttribute("fill") || "#72f6a6",
      d: d,
      textX: bbox.centerX,
      textY: bbox.centerY,
      textColor: textContent.color,
      fontSize: textContent.fontSize,
      id: path.getAttribute("id") || this.generateId(),
      name: textContent.content,
      shape_class: "block",
      g_parent_class: this.determineParentClass(textContent.content),
      g_parent_data_id: this.determineSectionId(textContent.content),
    };
  }

  findNearbyText(x, y) {
    const allTexts = this.doc.getElementsByTagName("text");
    let closestText = null;
    let minDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < allTexts.length; i++) {
      const text = allTexts[i];
      const content = text.textContent?.trim();

      if (content && content.match(/^[UPL]\d+$/)) {
        const textX = Number.parseFloat(text.getAttribute("x") || "0");
        const textY = Number.parseFloat(text.getAttribute("y") || "0");
        const distance = Math.sqrt(
          Math.pow(x - textX, 2) + Math.pow(y - textY, 2)
        );

        if (distance < minDistance && distance < 100) {
          minDistance = distance;
          closestText = {
            content,
            x: textX,
            y: textY,
            color: this.getTextColor(text),
            fontSize: this.getFontSize(text),
          };
        }
      }
    }

    return closestText;
  }

  calculatePathBoundingBox(d) {
    // More sophisticated path bounding box calculation
    const commands = d.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/g);
    let minX = Number.POSITIVE_INFINITY,
      maxX = Number.NEGATIVE_INFINITY,
      minY = Number.POSITIVE_INFINITY,
      maxY = Number.NEGATIVE_INFINITY;
    let currentX = 0,
      currentY = 0;

    if (!commands) return { centerX: 0, centerY: 0 };

    commands.forEach((command) => {
      const type = command[0];
      const coords = command
        .slice(1)
        .trim()
        .split(/[\s,]+/)
        .map((n) => Number.parseFloat(n))
        .filter((n) => !isNaN(n));

      for (let i = 0; i < coords.length; i += 2) {
        if (coords[i] !== undefined && coords[i + 1] !== undefined) {
          let x = coords[i];
          let y = coords[i + 1];

          if (type === type.toLowerCase() && type !== "m") {
            // Relative coordinates
            x += currentX;
            y += currentY;
          }

          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);

          currentX = x;
          currentY = y;
        }
      }
    });

    return {
      centerX: (minX + maxX) / 2,
      centerY: (minY + maxY) / 2,
    };
  }

  determineParentClass(sectionName) {
    if (sectionName.startsWith("U")) {
      return "section tickets";
    }
    return "section";
  }

  determineSectionId(sectionName) {
    const number = sectionName.match(/\d+/);
    if (number) {
      return `S_${number[0]}`;
    }
    return "S_1";
  }

  generateId() {
    return `section_${Math.random().toString(36).substr(2, 9)}`;
  }

  isAlreadyProcessed(element) {
    const id = element.getAttribute("id");
    return this.sections.some((section) => section.id === id);
  }
}

// Usage example:
const svgContent = `<!-- Your full SVG content here -->`;

try {
  const extractor = new SVGSectionExtractor(svgContent);
  const sections = extractor.extractAllSections();

  console.log("Extracted sections:");
  sections.forEach((section, index) => {
    console.log(`${index + 1}. ${section.name} (${section.type})`);
  });

  console.log("\nFull JSON output:");
  console.log(JSON.stringify(sections, null, 2));
} catch (error) {
  console.error("Error:", error);
}
