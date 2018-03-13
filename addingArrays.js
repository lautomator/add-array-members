var myApp = function () {
    "use strict";

    var model = {
        sizeOfArray: 25,
        maxRandom: 100,
        minRandom: 0,
        targets: data.targets,
        templates: data.templates,
        collection: null,
        total: null
    };

    function createArrayOfRanNumbers(limit, maxInt, minInt) {
        // Takes in the limit <int>.
        // Returns an array of random numbers.
        var out = [];
        var index = 0;
        var ranInt = null;

        while (index < limit) {
            ranInt = Math.random(minInt, maxInt) * 100;
            out.push(Math.floor(ranInt));
            index += 1;
        }
        out.sort();
        return out;
    }

    function addNumbersInArray(arrayIn) {
        // Takes in an array of numbers.
        // Returns the total <num>.
        var index = 0;
        var len = arrayIn.length;
        var total = 0;

        while (index < len) {
            total += arrayIn[index];
            index += 1;
        }
        return total;
    }

    function getGETParams(m) {
        var result = [];
        var tmp = [];
        var loc = m.loc;

        if (loc.search.length > 0) {
            loc.search
                .substr(1)
                .split("&")
                .forEach(function (item) {
                    tmp = item.split("=");
                    result.push([tmp[0], tmp[1]]);
                });
        }
        return result;
    }

    function render(model) {
        var template = model.templates[0];
        var dataEl = model.targets.results[0];
        var fieldsEl = model.targets.fields;
        var html = "";

        // fields
        fieldsEl[0].value = model.sizeOfArray.toString();
        fieldsEl[1].value = model.minRandom.toString();
        fieldsEl[2].value = model.maxRandom.toString();

        // data
        html = template.replace("%header%", "collection size:");
        html = html.replace("%data%", model.sizeOfArray);
        html += template.replace("%header%", "low/high:");
        html = html.replace("%data%", (model.minRandom.toString() + "/" + model.maxRandom.toString()));
        html += template.replace("%header%", "collection:");
        html = html.replace("%data%", model.collection.toString().replace(/,/g, " "));
        html += template.replace("%header%", "total:");
        html = html.replace("%data%", model.total);
        dataEl.innerHTML = html;
    }

    function init() {
        var params = getGETParams(model.targets);

        if (params.length > 0) {
            model.maxRandom = params[2][1];
            model.minRandom = params[1][1];
            model.sizeOfArray = params[0][1];
        }

        model.collection = createArrayOfRanNumbers(model.sizeOfArray, model.maxRandom, model.minRandom);
        model.total = addNumbersInArray(model.collection);
        render(model);
    }
    init();
};
myApp(data);