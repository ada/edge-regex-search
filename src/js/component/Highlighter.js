class Highlighter {
    constructor(element) {
      this.startNode = element;
      this.hiliteTag = "highlight";
      this.skipTags = new RegExp("^(?:" + this.hiliteTag + "|SCRIPT|FORM|SPAN|INPUT|SELECT|TEXTAREA|IMG|BUTTON|SVG|CANVAS)$", 'i');
      this.colors = ["yellow", "orange"];
      this.selectedIndex = 0;
      this.nResults = 0;
    }
  
    setStartNode(element) {
      this.startNode = element;
    }
  
    hiliteWords(node, regex) {
      if (node === undefined || !node)
        return;
  
      if (this.skipTags.test(node.nodeName))
        return;
  
      if (node.hasChildNodes()) {
        for (var i = 0; i < node.childNodes.length; i++) {
          this.hiliteWords(node.childNodes[i], regex);
        }
      };
  
      if (node.nodeType == 3 && node.nodeValue.length) {
        if (this.regs = regex.exec(node.nodeValue)) {
          var match = document.createElement(this.hiliteTag);
          match.appendChild(document.createTextNode(this.regs[0]));
          match.style.backgroundColor = this.colors[0];
          match.style.color = "#000";
  
          var after = node.splitText(this.regs.index);
          after.nodeValue = after.nodeValue.substring(this.regs[0].length);
          node.parentNode.insertBefore(match, after);
          this.nResults++;
        }
      }
    }
  
    selectIndex(index) {
      console.log(`selecting index ${index}.`);
  
      if (this.nResults === 0) {
        return;
      }
  
      let previousSelectedIndex = this.selectedIndex;
      this.selectedIndex = index;
      var arr = document.getElementsByTagName(this.hiliteTag);
      arr[previousSelectedIndex].style.backgroundColor = this.colors[0];
      arr[this.selectedIndex].style.backgroundColor = this.colors[1];
      arr[this.selectedIndex].scrollIntoView({behavior:'smooth', block:'center', inline:'center'});
    }
  
    apply(regex) {
      this.nResults = 0;
      this.hiliteWords(this.startNode, regex);
      console.log(`Found ${this.nResults} matches.`);
    }
  
    remove() {
      let arr = document.getElementsByTagName(this.hiliteTag);
  
      for (var i = 0; i < arr.length; i++) {
        const element = arr[i];
        let parent = element.parentNode;
        parent.replaceChild(element.firstChild, element);
        parent.normalize();
      }
  
      arr = document.getElementsByTagName(this.hiliteTag);
      if (arr.length) {
        this.remove();      
      }
  
    }
  
    selectPrevious() {
      let curr = this.selectedIndex;
      if (curr === 0) {
        curr = this.nResults -1;
      } else {
        curr--;
      }
  
      this.selectIndex(curr)
    }
  
    selectNext() {
      let curr = this.selectedIndex;
      if (curr === this.nResults - 1) {
        curr = 0;
      } else {
        curr++;
      }
  
      this.selectIndex(curr)
    }
  
  }