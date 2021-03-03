const methods = require('./methods');

function search_companies (obj) {
    return {
        from: obj.from,
        size: obj.size,
        highlight: {
            no_match_size: 100,
            encoder: "html",
            fields: {
                title: {},
                company_name: {},
                address: {}
            }
        },
        query: {
            bool: {
                should: [
                    {
                        bool: {
                            must: [
                                {
                                    match: {
                                        title: {
                                            query: obj.query
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        bool: {
                            must: [
                                {
                                    match: {
                                        company_name: {
                                            query: obj.query
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        bool: {
                            must: [
                                {
                                    match: {
                                        address: {
                                            query: obj.query
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        bool: {
                            must: [
                                {
                                    term: {
                                        near_subway: obj.query
                                    }
                                }
                            ]
                        }
                    },
                    {
                        bool: {
                            must: [
                                {
                                    term: {
                                        near_university: obj.query
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    };
}

function search_resumes (obj) {
    return {
        from: obj.from,
        size: obj.size,
        highlight: {
            no_match_size: 100,
            encoder: "html",
            fields: {
                title: {},
                work_place: {}
            }
        },
        query: {
            bool: {
                should: [
                    {
                        bool: {
                            must: [
                                {
                                    match: {
                                        title: {
                                            query: obj.query
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        bool: {
                            must: [
                                {
                                    match: {
                                        work_place: {
                                            query: obj.query
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        bool: {
                            must: [
                                {
                                    term: {
                                        name: obj.query
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    };
}

function search_albaboard (obj) {
    return {
        from: obj.from,
        size: obj.size,
        highlight: {
            no_match_size: 100,
            encoder: "html",
            fields: {
                title: {},
                content: {},
                tags: {no_match_size: 0}
            }
        },
        query: {
            bool: {
                should: [
                    {
                        bool: {
                            must: [
                                {
                                    match: {
                                        title: {
                                            query: obj.query
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        bool: {
                            must: [
                                {
                                    match: {
                                        content: {
                                            query: obj.query
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        bool: {
                            must: [
                                {
                                    term: {
                                        "tags.keyword": obj.query
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    };
}

function search_albareview (obj) {
    return {
        from: obj.from,
        size: obj.size,
        highlight: {
            no_match_size: 100,
            encoder: "html",
            fields: {
                title: {},
                content: {},
                tags: {no_match_size: 0}
            }
        },
        query: {
            bool: {
                should: [
                    {
                        bool: {
                            must: [
                                {
                                    match: {
                                        title: {
                                            query: obj.query
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        bool: {
                            must: [
                                {
                                    match: {
                                        content: {
                                            query: obj.query
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        bool: {
                            must: [
                                {
                                    term: {
                                        "tags.keyword": obj.query
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    };
}

module.exports = {
    index: function (es_client, index, body, cb) {
        es_client.index({
            index: index,
            body: body
        }, function (err, res) {
            if (err) {
                console.log("es_methods.index error occured. - index: " + index + ", article_id: '" + article_id + "', error: ");
                console.dir(err);
            } else {}
            return cb(res);// _index, _id
        });
    },
    search: function (es_client, index, obj, cb) {
        var body;
        if (index === "companies") {
            body = search_companies(obj);
        } else if (index === "resumes") {
            body = search_resumes(obj);
        } else if (index === "albaboard") {
            body = search_albaboard(obj);
        } else if (index === "albareview") {
            body = search_albareview(obj);
        }
        es_client.search({
            index: index,
            body: body
        }, function (err, res) {
            if (err) {
                console.log("es_methods.search error occured. - index: " + index + ", from: " + obj.from + ", size: " + obj.size + ", query: " + obj.query);
                console.dir(err);
            } else {
                console.log("es_methods.search success. - index: " + index + ", from: " + obj.from + ", size: " + obj.size + ", query: " + obj.query);
                var final = {};
                final.sources = [];
                final.total = 0;
                if (res && res.hits && res.hits.total && res.hits.total.value) {
                    final.total = res.hits.total.value;
                }
                if (res && res.hits && res.hits.hits) {
                    for (var i = 0; i < res.hits.hits.length; i++) {
                        final.sources.push(res.hits.hits[i]._source);
                    }
                }
                return cb(final);
            }
        });
    },
    search_all: function (es_client, obj, cb) {
        var body = [];
        body.push({
            index: "companies"
        });
        body.push(search_companies(obj));

        body.push({
            index: "resumes"
        });
        body.push(search_resumes(obj));

        body.push({
            index: "albaboard"
        });
        body.push(search_albaboard(obj));

        body.push({
            index: "albareview"
        });
        body.push(search_albareview(obj));

        es_client.msearch({
            body: body
        }, function (err, res) {
            if (err) {
                console.log("es_methods.search_all error occured. error: ");
                console.dir(err);
            } else {
                var hits
                    , final = {};

                final.companies = [];
                final.companies_total = 0;
                final.resumes = [];
                final.resumes_total = 0;
                final.albaboard = [];
                final.albaboard_total = 0;
                final.albareview = [];
                final.albareview_total = 0;

                // companies
                if (res && res.responses[0] && res.responses[0].hits && res.responses[0].hits.hits) {
                    hits = res.responses[0].hits.hits;
                    for (var i = 0; i < hits.length; i++) {
                        final.companies.push(hits[i]._source);
                    }
                    if (res && res.responses[0] && res.responses[0].hits && res.responses[0].hits.total && res.responses[0].hits.total.value) {
                        final.companies_total = res.responses[0].hits.total.value;
                    }
                }

                // resumes
                if (res && res.responses[1] && res.responses[1].hits && res.responses[1].hits.hits) {
                    hits = res.responses[1].hits.hits;
                    for (var i = 0; i < hits.length; i++) {
                        final.resumes.push(hits[i]._source);
                    }
                    if (res && res.responses[1] && res.responses[1].hits && res.responses[1].hits.total && res.responses[1].hits.total.value) {
                        final.resumes_total = res.responses[1].hits.total.value;
                    }
                }

                // albaboard
                if (res && res.responses[2] && res.responses[2].hits && res.responses[2].hits.hits) {
                    hits = res.responses[2].hits.hits;
                    for (var i = 0; i < hits.length; i++) {
                        final.albaboard.push(hits[i]._source);
                    }
                    if (res && res.responses[2] && res.responses[2].hits && res.responses[2].hits.total && res.responses[2].hits.total.value) {
                        final.albaboard_total = res.responses[2].hits.total.value;
                    }
                }

                // albareview
                if (res && res.responses[3] && res.responses[3].hits && res.responses[3].hits.hits) {
                    hits = res.responses[3].hits.hits;
                    for (var i = 0; i < hits.length; i++) {
                        final.albareview.push(hits[i]._source);
                    }
                    if (res && res.responses[3] && res.responses[3].hits && res.responses[3].hits.total && res.responses[3].hits.total.value) {
                        final.albareview_total = res.responses[3].hits.total.value;
                    }
                }

                return cb(final);
            }
        });
    },
    deleteByQuery: function (es_client, index, article_id, cb) {
        // http://localhost:3000/es_delete_by_query?index=companies&article_id=2
        es_client.deleteByQuery({
            index: index,
            type: "_doc",
            body: {
                query: {
                    term: {
                        article_id: article_id
                    }
                }
            }
        }, function (err, res) {
            if (err) {
                console.log("es_methods.deleteByQuery error occured. - index: " + index + ", article_id: " + article_id + ", error: ");
                console.dir(err);
            } else {}
            return cb();
        });
    }
};