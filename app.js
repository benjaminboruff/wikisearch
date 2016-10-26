/*global Vue*/
/*global $*/

var vm = new Vue({
    el: "#app",
    data: {
        data: [],
        search: ""
    },
    methods: {
        searchWiki: function () {
            var self = this;
            if (self.search !== "") { // don't make ajax call if there is no search string
                var api = "https://en.wikipedia.org//w/api.php?action=query&format=json&prop=extracts&exintro&exsentences=1&generator=search&exlimit=max&explaintext&gsrnamespace=0&gsrinfo=totalhits&gsrprop=snippet%7Ctitlesnippet&gsrsearch=" + self.search + "&callback=?";
                $.getJSON(api , function (data) {
                    var fromWikiKeys = Object.keys(data.query.pages);
                    var fromWikiData = data.query.pages;
                    var toData = fromWikiKeys.map(function (key) {
                        return {
                                "title" : fromWikiData[key].title,
                                "extract" : fromWikiData[key].extract,
                                "url" : "https://en.wikipedia.org/?curid=" + fromWikiData[key].pageid
                                };
                        });
                    self.data = toData;
                });
            } else {
                self.data = []; // if ther is no search string, clear page
            }
        }
    }
});
