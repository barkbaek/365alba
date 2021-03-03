const randomstring = require('randomstring');
const ObjectId = require('mongodb').ObjectId;
const crypto = require('crypto');
const config = require('./env.json')[process.env.NODE_ENV || 'development'];
const limit = require('./limit').get_all();
module.exports = {
    alba: function(connected_db, find, skip, cb) {
        if (skip < 0) {
            skip = 0;
        }
        var sort = { created_at: -1};
        connected_db.collection('companies').find(find).sort(sort).skip(skip).limit(limit.companies).toArray(function(err, docs) {
            if (err === null && docs !== null) {
                if (docs.length === 0) {
                    return cb([]);
                } else {
                    return cb(docs);
                }
            } else {
                return cb([]);
            }
        });
    },
    apply_email: function (connected_db, id, count, cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection('companies').updateOne({_id: id},
            {
                $set: {
                    count_email: count
                }
            }, function(err, res) {
                if (err) {
                    return cb();
                } else {
                    return cb();
                }
            });
    },
    apply_phone: function (connected_db, id, count, cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection('companies').updateOne({_id: id},
            {
                $set: {
                    count_phone: count
                }
            }, function(err, res) {
                if (err) {
                    return cb();
                } else {
                    return cb();
                }
            });
    },
    article: function (connected_db, id, f_cb, s_cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection('articles').findOne({_id: id}, function(err, doc) {
            if (err) {
                return f_cb(null);
            } else {
                if (doc === null) {
                    return f_cb(null);
                } else {
                    return s_cb(doc);
                }
            }
        });
    },
    article_count: function (connected_db, find, cb) {
        connected_db.collection('articles').find(find).count(function (err, count) {
            if (err === null) {
                return cb(count);
            } else {
                return cb(0);
            }
        });
    },
    articles: function (connected_db, find, skip, cb) {
        if (skip < 0) {
            skip = 0;
        }
        var sort = { created_at: -1};
        connected_db.collection('articles').find(find).sort(sort).skip(skip).limit(limit.articles).toArray(function(err, docs) {
            if (err === null && docs !== null) {
                if (docs.length === 0) {
                    return cb([]);
                } else {
                    return cb(docs);
                }
            } else {
                return cb([]);
            }
        });
    },
    change_password: function(connected_db, password, token, f_cb, s_cb) {
        password = crypto.createHash('sha256').update(password).digest('base64');
        connected_db.collection('users').updateOne({token: token},
            {
                $set: {
                    password:password,
                    token:"",
                    verified:true
                }
            }, function(err, res) {
            if (err) {
                return f_cb();
            } else {
                return s_cb();
            }
        });
    },
    check_email: function (connected_db, type, is_user, email, f_cb, f_cb1, s_cb) {
        connected_db.collection('users').findOne(
            {
                email:email,
                is_user: is_user
            }, function(err, doc) {
                if (err) {
                    return f_cb();
                } else {
                    if (doc === null) {
                        if (type === "register") {
                            return s_cb();
                        } else if (type === "forgot_password") {
                            return f_cb1();
                        }
                    } else {
                        if (type === "register") {
                            return f_cb1();
                        } else if (type === "forgot_password") {
                            return s_cb();
                        }
                    }
                }
            });
    },
    check_nick_name: function (connected_db, user_id, nick_name, f_cb, f_cb1, s_cb) {
        connected_db.collection('users').findOne({nick_name:nick_name}, function(err, doc) {
            if (err) {
                return f_cb();
            } else {
                if (doc === null) {
                    return s_cb();
                } else {
                    if (doc._id.toString() === user_id) {
                        return s_cb();
                    } else {
                        return f_cb1();
                    }
                }
            }
        });
    },
    check_token: function (connected_db, token, f_cb, s_cb) {
        connected_db.collection('users').findOne({token:token}, function(err, doc) {
            if (err) {
                return f_cb();
            } else {
                if (doc === null) {
                    return f_cb();
                } else {
                    return s_cb();
                }
            }
        });
    },
    check_user_by_pwd: function (connected_db, is_user, email, password, f_cb, f_cb1, s_cb) {
        password = crypto.createHash('sha256').update(password).digest('base64');
        connected_db.collection('users').findOne({is_user:is_user, email:email, password:password}, function(err, doc) {
            if (err) {
                return f_cb();
            } else {
                if (doc === null) {
                    return f_cb1();
                } else {
                    return s_cb(doc._id.toString(), doc.nick_name);
                }
            }
        });
    },
    check_user_by_user_id: function (connected_db, user_id, f_cb, s_cb) {
        try {
            user_id = new ObjectId(user_id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection('users').findOne({_id:user_id}, function(err, doc) {
            if (err) {
                return f_cb();
            } else {
                if (doc === null) {
                    return f_cb();
                } else {
                    return s_cb(doc);
                }
            }
        });
    },
    check_verified: function (connected_db, is_user, email, f_cb, f_cb1, f_cb2, s_cb) {
        connected_db.collection('users').findOne({is_user: is_user, email: email}, function(err, doc) {
            if (err) {
                return f_cb();
            } else {
                if (doc === null) {
                    return f_cb1();
                } else {
                    if (doc.verified === true) {
                        return s_cb();
                    } else {
                        return f_cb2();
                    }
                }
            }
        });
    },
    company: function (connected_db, id, f_cb, s_cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection('companies').findOne({_id: id}, function(err, doc) {
            if (err) {
                return f_cb(null);
            } else {
                if (doc === null) {
                    return f_cb(null);
                } else {
                    return s_cb(doc);
                }
            }
        });
    },
    company_count: function(connected_db, find, cb) {
        connected_db.collection('companies').find(find).count(function (err, count) {
            if (err === null) {
                return cb(count);
            } else {
                return cb(0);
            }
        });
    },
    event: function (connected_db, number, f_cb, s_cb) {
        connected_db.collection('events').findOne({number: number}, function(err, doc) {
            if (err) {
                return f_cb(null);
            } else {
                if (doc === null) {
                    return f_cb(null);
                } else {
                    return s_cb(doc);
                }
            }
        });
    },
    event_count: function (connected_db, find, cb) {
        connected_db.collection('events').find(find).count(function (err, count) {
            if (err === null) {
                return cb(count);
            } else {
                return cb(0);
            }
        });
    },
    events: function (connected_db, find, skip, cb) {
        if (skip < 0) {
            skip = 0;
        }
        var sort = { created_at: -1};
        connected_db.collection('events').find(find).sort(sort).skip(skip).limit(limit.events).toArray(function(err, docs) {
            if (err === null && docs !== null) {
                if (docs.length === 0) {
                    return cb([]);
                } else {
                    return cb(docs);
                }
            } else {
                return cb([]);
            }
        });
    },
    home_alba_express: function(connected_db, cb) {
        var sort = { created_at: -1};
        connected_db.collection('companies').find({is_express:true}).sort(sort).limit(4).toArray(function(err, docs) {
            if (err === null && docs !== null) {
                if (docs.length === 0) {
                    return cb([]);
                } else {
                    return cb(docs);
                }
            } else {
                return cb([]);
            }
        });
    },
    home_alba_today: function(connected_db, cb) {
        var sort = { created_at: -1};
        connected_db.collection('companies').find({}).sort(sort).limit(4).toArray(function(err, docs) {
            if (err === null && docs !== null) {
                if (docs.length === 0) {
                    return cb([]);
                } else {
                    return cb(docs);
                }
            } else {
                return cb([]);
            }
        });
    },
    home_albaboard: function(connected_db, cb) {
        var sort = { created_at: -1};
        connected_db.collection('articles').find({type: "albaboard"}).sort(sort).limit(8).toArray(function(err, docs) {
            if (err === null && docs !== null) {
                if (docs.length === 0) {
                    return cb([]);
                } else {
                    return cb(docs);
                }
            } else {
                return cb([]);
            }
        });
    },
    home_albareview: function(connected_db, cb) {
        var sort = { created_at: -1};
        connected_db.collection('articles').find({type: "albareview"}).sort(sort).limit(8).toArray(function(err, docs) {
            if (err === null && docs !== null) {
                if (docs.length === 0) {
                    return cb([]);
                } else {
                    return cb(docs);
                }
            } else {
                return cb([]);
            }
        });
    },
    insert_article: function (connected_db, obj, f_cb, s_cb) {
        connected_db.collection('articles').insertOne(obj, function (err, res) {
            if (err === null) {
                return s_cb(res["ops"][0]._id);
            } else {
                return f_cb();
            }
        });
    },
    insert_company: function (connected_db, notice, f_cb, s_cb) {
        connected_db.collection('companies').insertOne(notice, function (err, res) {
            if (err === null) {
                return s_cb(res["ops"][0]._id);
            } else {
                return f_cb();
            }
        });
    },
    insert_event: function (connected_db, obj, f_cb, s_cb) {
        connected_db.collection('events').insertOne(obj, function (err, res) {
            if (err === null) {
                return s_cb(obj.number);
            } else {
                return f_cb();
            }
        });
    },
    insert_resume: function (connected_db, user, f_cb, s_cb) {
        var doc = {};
        var date = new Date().valueOf();
        doc.user_id = user._id.toString();
        doc.name = user.user_name;
        doc.photo = config.aws_s3_url + "/icons/profile.png";
        doc.birth_year = user.birth_year;
        doc.sex = user.sex;
        doc.phone = user.phone;
        doc.email = user.email;
        doc.address_si = user.address_si;
        doc.address_goo = user.address_goo;
        doc.address_dong = user.address_dong;
        doc.title = "";
        doc.work_place_si = user.address_si;
        doc.work_place_goo = user.address_goo;
        doc.work_place_dong = user.address_dong;
        doc.work_types = [];
        doc.work_period = "";
        doc.work_days = [];
        doc.work_start_time = "";
        doc.work_end_time = "";
        doc.salary_type = "";
        doc.salary = 0;
        doc.final_education = "";
        doc.self_introduction = "";
        doc.career_months = 0;
        doc.careers = [];
        doc.language_skills = [];
        doc.certificates = [];
        doc.scrapped_users = [];
        doc.paid_users = [];
        doc.created_at = date;
        doc.updated_at = date;

        connected_db.collection('resumes').insertOne(doc, function (err, res) {
            if (err === null) {
                doc._id = res["ops"][0]._id;
                return s_cb(doc);
            } else {
                return f_cb();
            }
        });
    },
    insert_winner: function (connected_db, obj, f_cb, s_cb) {
        connected_db.collection('winners').insertOne(obj, function (err, res) {
            if (err === null) {
                return s_cb();
            } else {
                return f_cb();
            }
        });
    },
    my_companies: function(connected_db, user_id, skip, cb) {
        if (skip < 0) {
            skip = 0;
        }
        var sort = { created_at: -1};
        connected_db.collection('companies').find({user_id:user_id}).sort(sort).skip(skip).limit(limit.companies).toArray(function(err, docs) {
            if (err === null && docs !== null) {
                if (docs.length === 0) {
                    return cb([]);
                } else {
                    return cb(docs);
                }
            } else {
                return cb([]);
            }
        });
    },
    my_last_company: function(connected_db, user_id, cb) {
        var sort = { created_at: -1};
        connected_db.collection('companies').find({
            user_id: user_id
        }).sort(sort).limit(1).toArray(function(err, docs) {
            if (err === null && docs !== null) {
                if (docs.length === 0) {
                    return cb(null);
                } else {
                    return cb(docs[0]);
                }
            } else {
                return cb(null);
            }
        });
    },
    my_resume: function (connected_db, user_id, f_cb, f_cb1, s_cb) {
        connected_db.collection('resumes').findOne({user_id: user_id}, function(err, doc) {
            if (err) {
                return f_cb();
            } else {
                if (doc === null) {
                    return f_cb1();
                } else {
                    return s_cb(doc);
                }
            }
        });
    },
    pay_phone: function (connected_db, id, paid_users, f_cb, s_cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection("resumes").updateOne({_id: id},
            {
                $set: {
                    paid_users: paid_users
                }
            }, function(err, res) {
                if (err) {
                    return f_cb();
                } else {
                    return s_cb();
                }
            });
    },
    register: function (connected_db, is_user, email, password, token, f_cb, s_cb) {
        var date = new Date().valueOf();
        var self = this;
        var user = {
            is_user:is_user,
            email:email,
            password:password,
            user_name: "",
            company_name: "",
            nick_name: "",
            img: "",
            sex: "",
            phone: "",
            business_number: "",
            is_business_number_valid: false,
            address_si: "",
            address_goo: "",
            address_dong: "",
            address_detail: "",
            birth_year:0,
            birth_month: 0,
            birth_day: 0,
            count_awesome: 0,
            verified: false,
            token:token,
            points: 1000,
            created_at:date,
            updated_at:date
        };
        connected_db.collection('users').insertOne(user, function (err, res) {
            if (err === null) {
                return s_cb();
            } else {
                return f_cb();
            }
        });
    },
    remove_article: function (connected_db, id, user_id, f_cb, s_cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection('articles').remove(
            {
                _id: id,
                user_id: user_id
            }, function (err, result) {
                if (err === null) {
                    return s_cb();
                } else {
                    return f_cb();
                }
            });
    },
    remove_company: function (connected_db, id, user_id, f_cb, s_cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection('companies').remove(
            {
                _id: id,
                user_id: user_id
            }, function (err, result) {
            if (err === null) {
                return s_cb();
            } else {
                return f_cb();
            }
        });
    },
    resume: function (connected_db, id, f_cb, s_cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection('resumes').findOne({_id:id}, function(err, doc) {
            if (err) {
                return f_cb();
            } else {
                if (doc === null) {
                    return f_cb();
                } else {
                    delete doc.user_id;
                    return s_cb(doc);
                }
            }
        });
    },
    resume_count: function(connected_db, find, cb) {
        connected_db.collection('resumes').find(find).count(function (err, count) {
            if (err === null) {
                return cb(count);
            } else {
                return cb(0);
            }
        });
    },
    resumes: function(connected_db, find, skip, cb) {
        if (skip < 0) {
            skip = 0;
        }
        var sort = { updated_at: -1};
        connected_db.collection('resumes').find(find).sort(sort).skip(skip).limit(limit.resumes).toArray(function(err, docs) {
            if (err === null && docs !== null) {
                if (docs.length === 0) {
                    return cb([]);
                } else {
                    return cb(docs);
                }
            } else {
                return cb([]);
            }
        });
    },
    scrap: function (connected_db, collection, id, scrapped_users, f_cb, s_cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection(collection).updateOne({_id: id},
            {
                $set: {
                    scrapped_users: scrapped_users
                }
            }, function(err, res) {
                if (err) {
                    return f_cb();
                } else {
                    return s_cb();
                }
            });
    },
    set_points: function (connected_db, id, points, f_cb, s_cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection("users").updateOne({_id: id},
            {
                $set: {
                    points: points
                }
            }, function(err, res) {
                if (err) {
                    return f_cb();
                } else {
                    return s_cb();
                }
            });
    },
    update_article: function (connected_db, id, user_id, set, f_cb, s_cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection("articles").updateOne({_id: id, user_id: user_id},
            set, function(err, res) {
                if (err) {
                    return f_cb();
                } else {
                    return s_cb();
                }
            });
    },
    update_applied_resumes: function (connected_db, id, applied_resumes, f_cb, s_cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection('companies').updateOne(
            {
                _id: id
            },
            { $set: { applied_resumes: applied_resumes } },
            function(err, res) {
                if (err === null) {
                    return s_cb();
                } else {
                    return f_cb();
                }
            });
    },
    update_comment: function (connected_db, id, comments, f_cb, s_cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection("articles").updateOne({_id: id},
            {
                $set: {
                    comments: comments
                }
            }, function(err, res) {
                if (err) {
                    return f_cb();
                } else {
                    return s_cb();
                }
            });
    },
    update_company: function (connected_db, id, user_id, set, f_cb, s_cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection('companies').updateOne(
            {
                _id: id,
                user_id: user_id
            },
            set,
            function(err, res) {
                if (err === null) {
                    return s_cb();
                } else {
                    return f_cb();
                }
            });
    },
    update_count_view: function (connected_db, collection, id, count, f_cb, s_cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection(collection).updateOne(
            {
                _id: id
            },
            {
                $set: {
                    count_view: count
                }
            },
            function(err, res) {
                if (err === null) {
                    return s_cb();
                } else {
                    return f_cb();
                }
            });
    },
    update_deadline: function (connected_db, id, user_id, f_cb, s_cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        var year = yesterday.getFullYear();
        var month = yesterday.getMonth() + 1;
        var day = yesterday.getDate();
        var date;
        if (month < 10) {
            date = year + "/0" + month;
        } else {
            date = year + "/" + month;
        }
        if (day < 10) {
            date = date + "/0" + day;
        } else {
            date = date + "/" + day;
        }
        connected_db.collection('companies').updateOne(
            {
                _id: id,
                user_id: user_id
            },
            {$set: {
                finish_year: year,
                finish_month: month,
                finish_day: day,
                finish_date: date
            }},
            function(err, res) {
                if (err === null) {
                    return s_cb();
                } else {
                    return f_cb();
                }
            });
    },
    update_photo: function (connected_db, user_id, path, cb) {
        connected_db.collection('resumes').updateOne(
            {user_id: user_id},
            {$set: { photo: path }},
            function(err, res) {
                if (err === null) {
                    return cb(path);
                } else {
                    return cb(path);
                }
            });
    },
    update_profile: function (connected_db, user_id, set, f_cb, s_cb) {
        try {
            user_id = new ObjectId(user_id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection('users').updateOne(
            {_id: user_id},
            set,
            function(err, res) {
                if (err === null) {
                    return s_cb();
                } else {
                    return f_cb();
                }
            });
    },
    update_resume: function (connected_db, user_id, set, f_cb, s_cb) {
        connected_db.collection('resumes').updateOne(
            {user_id: user_id},
            set,
            function(err, res) {
                if (err === null) {
                    return s_cb();
                } else {
                    return f_cb();
                }
            });
    },
    update_token: function(connected_db, is_user, email, token, f_cb, s_cb) {
        connected_db.collection('users').updateOne({is_user: is_user, email: email},
            {$set: {
                token: token
            }},
            function(err, res) {
                if (err === null) {
                    return s_cb();
                } else {
                    return f_cb();
                }
            });
    },
    verify: function(connected_db, token, f_cb, s_cb) {
        connected_db.collection('users').updateOne({token: token},
            {$set: {
                token: "",
                verified: true
            }},
            function(err, res) {
                if (err === null) {
                    return s_cb();
                } else {
                    return f_cb();
                }
            });
    },
    winner: function (connected_db, id, f_cb, s_cb) {
        try {
            id = new ObjectId(id);
        } catch (e) {
            return f_cb();
        }
        connected_db.collection('winners').findOne({_id: id}, function(err, doc) {
            if (err) {
                return f_cb(null);
            } else {
                if (doc === null) {
                    return f_cb(null);
                } else {
                    return s_cb(doc);
                }
            }
        });
    },
    winner_count: function (connected_db, find, cb) {
        connected_db.collection('winners').find(find).count(function (err, count) {
            if (err === null) {
                return cb(count);
            } else {
                return cb(0);
            }
        });
    },
    winners: function (connected_db, find, skip, cb) {
        if (skip < 0) {
            skip = 0;
        }
        var sort = { created_at: -1};
        connected_db.collection('winners').find(find).sort(sort).skip(skip).limit(limit.winners).toArray(function(err, docs) {
            if (err === null && docs !== null) {
                if (docs.length === 0) {
                    return cb([]);
                } else {
                    return cb(docs);
                }
            } else {
                return cb([]);
            }
        });
    },
};