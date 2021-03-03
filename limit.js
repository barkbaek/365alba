module.exports = {
    get_all: function () {
        var limit = {};
        limit.applicants = 20;
        limit.articles = 20;
        limit.companies = 20;
        limit.events = 9;
        limit.resumes = 20;
        limit.search_all = 5;
        limit.search_albaboard = 10;
        limit.search_albareview = 10;
        limit.search_companies = 10;
        limit.search_resumes = 10;
        limit.winners = 20;
        return limit;
    }
};