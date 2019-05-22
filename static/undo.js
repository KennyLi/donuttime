var chistory = {};
var credo = {};
var lhistory = [];
var lredo = [];
var baseCanvases = {};
window.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key == "z") {
        if (lhistory.length == 0) {
            return
        }
	    let oldcvs1 = lhistory.pop();
        let oldcvs0 = lhistory[lhistory.length - 1]
        clist = chistory[old];
        let historydata;
        if (old == undefined) {
            historydata = baseCanvases[old];
            old.putImageData(historydata,0,0);
        } else {
            historydata = clist.pop();
            historydata = clist[clist.length-1];
            old.putImageData(historydata,0,0);
            addRedo(old,historydata);
        }
    }

});

var addHistory = function(ctx,data) {
    chistory[ctx].push(data);
    lhistory.push(ctx);
};

var addRedo = function(ctx,data) {
    credo[ctx].push(data);
    lredo.push(ctx);
};


window.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key == "y") {
        if (lredo.length == 0) {
            return
        }
        old = lhistory.pop();
        old = lhistory[lhistory.length - 1]
        clist = chistory[old];
        historydata = clist.pop();
        historydata = clist[clist.length-1]
        old.putImageData(historydata,0,0)
	    addHistory(ctx,historydata)

    }

});
