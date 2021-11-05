// window.addEventListener("load", function() {
//
//     class Help {
//
//
//         constructor() {
//             let help = document.querySelectorAll("[mcss-help]");
//             let helpArr = [];
//
//             for (let i = 0; i < help.length; i++) {
//                 helpArr.push(help[i]);
//             }
//
//             this.sortByIndex(helpArr);
//
//             this.helpArr = helpArr;
//
//             let helpNodes = [];
//             for (let i = 0; i < helpArr.length; i++) {
//                 let helpNode = document.createElement("div");
//
//                 helpNode.classList.add("help");
//                 helpNode.style.display = "none";
//                 helpNode.style.position = "absolute";
//                 helpNode.style.top = helpArr[i].offsetTop + "px";
//
//                 let title = helpArr[i].getAttribute("mcss-help");
//                 let text = helpArr[i].getAttribute("mcss-help-text");
//                 helpNode.innerHTML = "<div class='help_content'><div class='help_title'>"+title+"</div><div class='help_text'>"+text+"</div></div>";
//
//                 document.body.appendChild(helpNode);
//
//                 helpNodes.push(helpNode);
//             }
//
//             this.curElement = 0;
//             this.helpNodes = helpNodes;
//
//             this.Show(this.curElement);
//         }
//
//         sortByIndex(arr) {
//             arr.sort((a, b) => { return +a.getAttribute("mcss-help-index") > +b.getAttribute("mcss-help-index") ? 1 : -1 });
//         }
//
//         Next() {
//             this.Hide(this.curElement);
//
//             let second = false;
//             while (!second) {
//                 this.curElement++;
//
//                 if (this.helpArr[this.curElement] != null)
//                     second = this.helpArr[this.curElement].getAttribute("mcss-help-nonstart") == null;
//                 else
//                     second = true;
//             }
//             this.Show(this.curElement);
//         }
//
//         Hide(index = -1) {
//             if (index == -1) {
//                 for (let i = 0; i < this.helpNodes.length; i++) {
//                     this.helpNodes[i].style.display = "none";
//                 }
//             }
//             else {
//                 if (this.helpNodes[index] != null)
//                     this.helpNodes[index].style.display = "none";
//             }
//         }
//
//         Show(index) {
//             if (this.helpNodes[index] != null) {
//                 window.scrollTo(0, parseInt(this.helpNodes[index].style.top) + 100);
//                 this.helpNodes[index].style.display = "block";
//             }
//         }
//     }
//
//     MonoCSS.hlp = new Help();
//
//     var time = 0;
//     window.addEventListener("click", function(e) {
//         if (MonoCSS.hlp.curElement > MonoCSS.hlp.helpNodes.length-1) {
//             window.removeEventListener("click", this);
//         }
//         if ((e.timeStamp - time) < 500) { return; }
//         MonoCSS.hlp.Next();
//         time = e.timeStamp;
//     });
// });

class MonoCSS {
    static Tooltip = new class {
        curElement = 0;

        Start() {
            this.curElement = 0;
            this.Hide();
            this.Show(this.curElement);
            var time = 0;
            const t = this;

            function clc(e) {
                if (t.curElement >= t.helpNodes.length-1) {
                    t.Hide();
                    window.removeEventListener("click", clc);
                }
                if ((e.timeStamp - time) < 500) { return; }
                t.Next();
                time = e.timeStamp;
            }

            window.addEventListener("click", clc);
        }

        Init() {
            let help = document.querySelectorAll("[mcss-help]");
            let helpArr = [];

            for (let i = 0; i < help.length; i++) {
                helpArr.push(help[i]);
            }

            this.sortByIndex(helpArr);

            this.helpArr = helpArr;

            let helpNodes = [];
            for (let i = 0; i < helpArr.length; i++) {
                let helpNode = document.createElement("div");

                helpNode.classList.add("help");
                helpNode.style.display = "none";
                helpNode.style.position = "absolute";
                helpNode.style.top = helpArr[i].offsetTop + "px";

                let title = helpArr[i].getAttribute("mcss-help");
                let text = helpArr[i].getAttribute("mcss-help-text");
                helpNode.innerHTML = "<div class='help_content'><div class='help_title'>"+title+"</div><div class='help_text'>"+text+"</div></div>";

                document.body.appendChild(helpNode);

                helpNodes.push(helpNode);
            }

            this.curElement = 0;
            this.helpNodes = helpNodes;
        }

        sortByIndex(arr) {
            arr.sort((a, b) => { return +a.getAttribute("mcss-help-index") > +b.getAttribute("mcss-help-index") ? 1 : -1 });
        }

        Next() {
            this.Hide(this.curElement);

            let second = false;
            while (!second) {
                this.curElement++;

                if (this.helpArr[this.curElement] != null)
                    second = this.helpArr[this.curElement].getAttribute("mcss-help-nonstart") == null;
                else
                    second = true;
            }
            this.Show(this.curElement);
        }

        Hide(index = -1) {
            if (index == -1) {
                for (let i = 0; i < this.helpNodes.length; i++) {
                    this.helpNodes[i].style.display = "none";
                }
            }
            else {
                if (this.helpNodes[index] != null)
                    this.helpNodes[index].style.display = "none";
            }
        }

        Show(index) {
            if (this.helpNodes[index] != null) {
                window.scrollTo(0, parseInt(this.helpNodes[index].style.top) + 100);
                this.helpNodes[index].style.display = "block";
            }
        }
    };

    static Init() {
        MonoCSS.Tooltip.Init();
    }

    static AbortAll() {
        window.removeEventListener("click");
    }
}

window.addEventListener("load", MonoCSS.Init);