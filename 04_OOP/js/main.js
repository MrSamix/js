// Task 1
class Circle{
    #radius;
    getRadius()
    {
        return this.#radius;
    }
    setRadius(radius)
    {
        if(radius > 0)
        {
            this.#radius = radius;
        }
        else
        {
            throw new Error("Radius must be positive");
        }
    }
    getDiameter()
    {
        return this.#radius * 2;
    }
    getArea()
    {
        return Math.PI * this.#radius * this.#radius;
    }
    getLength()
    {
        return 2 * Math.PI * this.#radius;
    }
}
let circle = new Circle();
circle.setRadius(5);
console.log("Radius:", circle.getRadius());
console.log("Diameter:", circle.getDiameter());
console.log("Area:", circle.getArea());
console.log("Length:", circle.getLength());

// Task 2
class HtmlElement {
    constructor(tagName, selfClosing = false, textContent = "") {
        this.tagName = tagName;
        this.selfClosing = selfClosing;
        this.textContent = textContent;
        this.attributes = [];
        this.styles = [];
        this.children = [];
    }
    
    setAttribute(name, value) {
        this.attributes.push({ name, value });
    }
    
    setStyle(name, value) {
        this.styles.push({ name, value });
    }
    
    addElementToEnd(element) {
        this.children.push(element);
    }
    
    addElementToStart(element) {
        this.children.unshift(element);
    }
    
    getHtml() {
        let attrs = this.attributes
            .map(a => ` ${a.name}="${a.value}"`)
            .join("");
        let styleStr = this.styles
            .map(s => `${s.name}:${s.value}`)
            .join("; ");
        if (styleStr) attrs += ` style="${styleStr}"`;
        
        if (this.selfClosing) {
            return `<${this.tagName}${attrs} />`;
        } else {
            let inner = this.textContent;
            for (let child of this.children) {
                inner += child.getHtml();
            }
            return `<${this.tagName}${attrs}>${inner}</${this.tagName}>`;
        }
    }
}

let wrapper = new HtmlElement("div", false);
wrapper.setAttribute("id", "wrapper");
wrapper.setStyle("display", "flex");


for (let i = 0; i < 2; i++) {
    let block = new HtmlElement("div", false);
    block.setStyle("width", "300px");
    block.setStyle("margin", "10px");

    let title = new HtmlElement("h3", false, "What is Lorem Ipsum?");
    block.addElementToEnd(title);

    let img = new HtmlElement("img", true);
    img.setStyle("width", "100%");
    img.setAttribute("src", "lipsum.jpg");
    img.setAttribute("alt", "Lorem Ipsum");
    block.addElementToEnd(img);

    let paragraph = new HtmlElement("p", false);
    paragraph.setStyle("text-align", "justify");
    paragraph.textContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. `;

    let link = new HtmlElement("a", false, "More...");
    link.setAttribute("href", "https://www.lipsum.com/");
    link.setAttribute("target", "_blank");
    paragraph.addElementToEnd(link);

    block.addElementToEnd(paragraph);
    wrapper.addElementToEnd(block);
}

document.writeln(wrapper.getHtml());

// Task 3
class CssClass {
    constructor(className) {
        this.className = className;
        this.styles = [];
    }
    
    setStyle(name, value) {
        const index = this.styles.findIndex(s => s.name === name);
        if (index > -1) {
            this.styles[index].value = value;
        } else {
            this.styles.push({ name, value });
        }
    }
    
    removeStyle(name) {
        this.styles = this.styles.filter(s => s.name !== name);
    }
    
    getCss() {
        let stylesStr = this.styles.map(s => `${s.name}: ${s.value}`).join("; ");
        return `.${this.className} { ${stylesStr} }`;
    }
}

let buttonClass = new CssClass("btn");

buttonClass.setStyle("background-color", "blue");
buttonClass.setStyle("color", "white");
buttonClass.setStyle("padding", "10px 20px");

console.log(buttonClass.getCss());

buttonClass.setStyle("color", "black");

console.log(buttonClass.getCss());

buttonClass.removeStyle("padding");
console.log(buttonClass.getCss());

// Task 4
class HtmlBlock {
    constructor() {
        this.styles = [];
        this.rootElement = null;
    }

    addStyle(cssClass) {
        this.styles.push(cssClass);
    }

    setRootElement(element) {
        this.rootElement = element;
    }

    getCode() {
        let styleCode = "<style>\n";
        for (let cssClass of this.styles) {
            styleCode += cssClass.getCss() + "\n";
        }
        styleCode += "</style>\n";

        let htmlCode = this.rootElement ? this.rootElement.getHtml() : "";
        return styleCode + htmlCode;
    }
}


let wrapClass = new CssClass("wrap");
wrapClass.setStyle("display", "flex");

let blockClass = new CssClass("block");
blockClass.setStyle("width", "300px");
blockClass.setStyle("margin", "10px");

let imgClass = new CssClass("img");
imgClass.setStyle("width", "100%");

let textClass = new CssClass("text");
textClass.setStyle("text-align", "justify");

let wrapperr = new HtmlElement("div", false);
wrapperr.setAttribute("id", "wrapper");
wrapperr.setAttribute("class", "wrap");

for (let i = 0; i < 2; i++) {
    let block = new HtmlElement("div", false);
    block.setAttribute("class", "block");

    let title = new HtmlElement("h3", false, "What is Lorem Ipsum?");
    block.addElementToEnd(title);

    let img = new HtmlElement("img", true);
    img.setAttribute("class", "img");
    img.setAttribute("src", "lipsum.jpg");
    img.setAttribute("alt", "Lorem Ipsum");
    block.addElementToEnd(img);

    let paragraph = new HtmlElement("p", false);
    paragraph.setAttribute("class", "text");
    paragraph.textContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. `;
    let link = new HtmlElement("a", false, "More...");
    link.setAttribute("href", "https://www.lipsum.com/");
    link.setAttribute("target", "_blank");
    paragraph.addElementToEnd(link);

    block.addElementToEnd(paragraph);
    wrapperr.addElementToEnd(block);
}

let htmlBlockk = new HtmlBlock();
htmlBlockk.addStyle(wrapClass);
htmlBlockk.addStyle(blockClass);
htmlBlockk.addStyle(imgClass);
htmlBlockk.addStyle(textClass);
htmlBlockk.setRootElement(wrapperr);


document.writeln(htmlBlockk.getCode());