"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Query = "\n    type Query {\n        getHerbariums(page: Int, limit: Int): Herbariums\n\n        categoryList: [CategoryItem]\n        searchItem(text: String, categories: [String]): SearchPayload\n    }\n";

var Mutation = "\n    \n";

var Typed = "\n    type Image {\n        url: String\n        width: Int\n        height: Int\n    }\n\n    type Herbarium {\n        cuid: String\n        name: String\n        blockNo: Int\n        slotNo: String\n        scientificName: String\n        collector_en: String\n        collector_th: String\n        altitude: String\n        date: String \n        family: String\n        locationName: String\n        otherName: String\n        duplicateAmount: Int\n        habit: String\n        note: String\n        images: [Image]\n    }\n\n    type Herbariums {\n        results: [Herbarium]\n        total: Int\n        currentPage: Int\n        totalPages: Int\n         \n    }\n\n\n    # Searching\n    type CategoryItem {\n        name: String\n        value: String\n    }\n    type SearchResultItem {\n        cuid: String\n        name: String\n        blockNo: Int\n        slotNo: String\n        scientificName: String\n        family: String\n    }\n    type SearchPayload {\n        results: [SearchResultItem]\n        total: Int\n        totalPages: Int\n        currentPage: Int\n    }\n";

var Schema = "\n    schema {\n        query: Query\n    }\n";

exports.default = [Schema, Query, Mutation, Typed];
//# sourceMappingURL=schema.js.map