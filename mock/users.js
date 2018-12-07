export default {
    'GET /articles': (req, res) => {
        setTimeout(() => {
            /* res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write('Error 400:resource not found');
            res.end(); */
            res.json([{"id":4,"article_title":"wlp dswlp","article_describe":"测试","article_corver":"","article_date":"2018-10-24T13:33:03.000Z","article_content":"<p>😀😱😉😋<img src=\"uploads/1540387887946.jpg\" style=\"max-width: 100%;\"><br></p>","article_click":14,"article_type":0,"article_tags":[{"id":7,"articleid":4,"tagid":1,"tag":{"id":1,"name":"node"}}],"messages":[{"id":1,"name":"zzz","email":"935388383@qq.com","home":"www.zyzcss.xyz","articleid":4,"imgUrl":null,"content":"asddassad","reply":null,"type":0,"isAudit":0,"createTime":"2018-10-26T05:48:22.000Z","son":[{"id":2,"name":"aaa","email":"935388383@qq.com","home":null,"articleid":4,"imgUrl":null,"content":"ccc","reply":1,"type":0,"isAudit":0,"createTime":"2018-10-27T05:49:15.000Z","son":[{"id":3,"name":"vvv","email":null,"home":null,"articleid":4,"imgUrl":null,"content":"cc","reply":2,"type":null,"isAudit":0,"createTime":"2018-11-10T05:57:03.000Z"}]}]}],"comment":3},
            {"id":3,"article_title":"mysql","article_describe":"test","article_corver":null,"article_date":"2018-10-23T03:03:52.000Z","article_content":"<p>asdsadasdasdsdasdasdsadsadsadas测试d?</p>","article_click":8,"article_type":0,"article_tags":[{"id":4,"articleid":3,"tagid":3,"tag":{"id":3,"name":"mysql"}}],"messages":[],"comment":0},
            {"id":1,"article_title":"mysql","article_describe":"test","article_corver":null,"article_date":"2018-10-23T03:03:52.000Z","article_content":"<p>asdsadasdasdsdasdasdsadsadsadas测试d?</p>","article_click":8,"article_type":0,"article_tags":[{"id":4,"articleid":3,"tagid":3,"tag":{"id":3,"name":"mysql"}}],"messages":[],"comment":0},
            {"id":5,"article_title":"mysql","article_describe":"test","article_corver":null,"article_date":"2018-10-23T03:03:52.000Z","article_content":"<p>asdsadasdasdsdasdasdsadsadsadas测试d?</p>","article_click":8,"article_type":0,"article_tags":[{"id":4,"articleid":3,"tagid":3,"tag":{"id":3,"name":"mysql"}}],"messages":[],"comment":0},
            {"id":6,"article_title":"mysql","article_describe":"test","article_corver":null,"article_date":"2018-10-23T03:03:52.000Z","article_content":"<p>asdsadasdasdsdasdasdsadsadsadas测试d?</p>","article_click":8,"article_type":0,"article_tags":[{"id":4,"articleid":3,"tagid":3,"tag":{"id":3,"name":"mysql"}}],"messages":[],"comment":0},
            {"id":7,"article_title":"mysql","article_describe":"test","article_corver":null,"article_date":"2018-10-23T03:03:52.000Z","article_content":"<p>asdsadasdasdsdasdasdsadsadsadas测试d?</p>","article_click":8,"article_type":0,"article_tags":[{"id":4,"articleid":3,"tagid":3,"tag":{"id":3,"name":"mysql"}}],"messages":[],"comment":0},
            {"id":8,"article_title":"mysql","article_describe":"test","article_corver":null,"article_date":"2018-10-23T03:03:52.000Z","article_content":"<p>asdsadasdasdsdasdasdsadsadsadas测试d?</p>","article_click":8,"article_type":0,"article_tags":[{"id":4,"articleid":3,"tagid":3,"tag":{"id":3,"name":"mysql"}}],"messages":[],"comment":0},
            {"id":9,"article_title":"mysql","article_describe":"test","article_corver":null,"article_date":"2018-10-23T03:03:52.000Z","article_content":"<p>asdsadasdasdsdasdasdsadsadsadas测试d?</p>","article_click":8,"article_type":0,"article_tags":[{"id":4,"articleid":3,"tagid":3,"tag":{"id":3,"name":"mysql"}}],"messages":[],"comment":0},
            {"id":10,"article_title":"mysql","article_describe":"test","article_corver":null,"article_date":"2018-10-23T03:03:52.000Z","article_content":"<p>asdsadasdasdsdasdasdsadsadsadas测试d?</p>","article_click":8,"article_type":0,"article_tags":[{"id":4,"articleid":3,"tagid":3,"tag":{"id":3,"name":"mysql"}}],"messages":[],"comment":0},
            {"id":2,"article_title":"node","article_describe":"node","article_corver":null,"article_date":"2018-10-23T03:02:54.000Z","article_content":"<p>asssssssssssssssdasd😑😳😡</p>","article_click":8,"article_type":0,"article_tags":[{"id":3,"articleid":2,"tagid":1,"tag":{"id":1,"name":"node"}},{"id":5,"articleid":2,"tagid":2,"tag":{"id":2,"name":"react"}}],"messages":[],"comment":0},{"id":1,"article_title":"test","article_describe":"ttt","article_corver":null,"article_date":"2018-10-22T12:45:25.000Z","article_content":"<p>😇😛测试<br></p><h1>测试</h1>","article_click":16,"article_type":0,"article_tags":[{"id":1,"articleid":1,"tagid":1,"tag":{"id":1,"name":"node"}},{"id":2,"articleid":1,"tagid":3,"tag":{"id":3,"name":"mysql"}},{"id":7,"articleid":4,"tagid":1,"tag":{"id":1,"name":"node"}},{"id":8,"articleid":4,"tagid":1,"tag":{"id":1,"name":"cccccccccccc"}},{"id":9,"articleid":4,"tagid":1,"tag":{"id":1,"name":"nodeccccccccccccc"}}],"messages":[],"comment":0}])
        },1000)
    },
    'GET /article/*': (req, res) => {
        setTimeout(() => {
            res.json({"id":4,"article_title":"wlp dswlp","article_describe":"测试","article_corver":"uploads/1540387887946.jpg","article_date":"2018-10-24T13:33:03.000Z","article_content":"<p>😀😱😉😋<img src=\"uploads/1540387887946.jpg\" style=\"max-width: 100%;\"><br></p>","article_click":19,"article_type":0,
            "article_tags":[{"id":7,"articleid":4,"tagid":1,"tag":{"id":1,"name":"node"}}],
            "messages":[
                {"id":1,"name":"1","home":"www.zyzcss.xyz","articleid":4,"imgUrl":null,"content":"asddassad","reply":null,"type":0,"isAudit":0,"createTime":"2018-10-26T05:48:22.000Z",
                "son":[
                        {"id":2,"name":"2","home":null,"articleid":4,"imgUrl":null,"content":"ccc","reply":1,"type":0,"isAudit":0,"createTime":"2018-10-27T05:49:15.000Z",
                        "son":[
                            {"id":3,"name":"3","home":null,"articleid":4,"imgUrl":null,"content":"cc","reply":2,"type":0,"isAudit":0,"createTime":"2018-11-10T05:57:03.000Z"}
                        ]}
                    ]
                },
            {"id":4,"name":"4","home":"sadsa","articleid":4,"imgUrl":null,"content":"vvv","reply":null,"type":0,"isAudit":0,"createTime":"2018-10-26T05:48:22.000Z"},
            {"id":5,"name":"5","home":null,"articleid":4,"imgUrl":null,"content":"&lt;div&gt;asd&lt;/div&gt;","reply":null,"type":0,"isAudit":0,"createTime":"2018-10-28T14:12:56.000Z"},
            {"id":6,"name":"6","home":null,"articleid":4,"imgUrl":null,"content":"&lt;div&gt;asd&lt;/div&gt;","reply":null,"type":0,"isAudit":0,"createTime":"2018-10-28T14:12:56.000Z"}],"comment":6})
        },100)
    },
    'POST /api/user': (req, res) => {
        setTimeout(function(){
            res.json({
                success:true,
                data:['foo','aa']
            })
        },500); 
    },
     'GET /search/*':(req,res) =>{
        setTimeout(() => {
            res.json([])
        },100)
    }, 
    'GET /tags':(req,res) =>{
        setTimeout(() => {
            res.json({
                id:0,
                article_title:'敖德萨大所多阿树大师大师大师大师大师打打阿树大师',
                article_describe:'Cloudflare异常缓慢： Cloudflare因为支持Websocket，导致今年都快要被一些玩家给玩坏了，博主这两天在折腾Cloudflare CDN，不过并非用于那些奇技淫巧，仅仅是为了节省网站宽带，在使用过程中我发现Clou',
                article_corver:'https://dream.ren/pic/%E5%8F%88%E6%B2%A1%E5%9B%BE%E4%BA%86%EF%BC%8C%E7%9C%9F%E8%AE%A9%E4%BA%BA%E9%B8%A1%E5%8A%A8.gif',
                article_date:'2018-1-2',
                article_tag:'asdads',
                article_comments:[],
                article_content:'asdadasdasdasdasdasasdadasdasdasdasdasasdadasdasdasdasdasasdadasdasdasdasdas\r\nasdasdasds<img src="asdasda.com"/><br/>',
                article_click:100,
                article_type:0,
            })
        },100)
    },
    'GET /hottags':(req,res) =>{
        setTimeout(() => {
            res.json([{"id":1,"articleid":1,"tagid":1,"tag.id":1,"tag.name":"node","count":"2"},
            {"id":2,"articleid":1,"tagid":2,"tag.id":2,"tag.name":"react","count":"3"},
            {"id":4,"articleid":3,"tagid":3,"tag.id":3,"tag.name":"mysql","count":"1"},
            {"id":5,"articleid":3,"tagid":3,"tag.id":3,"tag.name":"mysql1","count":"4"},
            {"id":6,"articleid":1,"tagid":1,"tag.id":1,"tag.name":"node11","count":"5"},
            {"id":7,"articleid":1,"tagid":2,"tag.id":2,"tag.name":"react2","count":"10"},
            {"id":8,"articleid":3,"tagid":3,"tag.id":3,"tag.name":"mysql2","count":"11"},
            {"id":9,"articleid":3,"tagid":3,"tag.id":3,"tag.name":"mysql3","count":"8"},{"id":10,"articleid":1,"tagid":1,"tag.id":1,"tag.name":"node9","count":"2"},
            {"id":12,"articleid":1,"tagid":2,"tag.id":2,"tag.name":"react4","count":"9"},
            {"id":14,"articleid":3,"tagid":3,"tag.id":3,"tag.name":"mysql5","count":"2"},
            {"id":18,"articleid":3,"tagid":3,"tag.id":3,"tag.name":"mysql8","count":"3"}])
        },100)
    },
    'GET /searchTag/*':(req,res) =>{
        setTimeout(() => {
            res.json([{
                id:0,
                article_title:'敖德萨大所多阿树大师大师大师大师大师打打阿树大师',
                article_describe:'Cloudflare异常缓慢： Cloudflare因为支持Websocket，导致今年都快要被一些玩家给玩坏了，博主这两天在折腾Cloudflare CDN，不过并非用于那些奇技淫巧，仅仅是为了节省网站宽带，在使用过程中我发现Clou',
                article_corver:'https://dream.ren/pic/%E5%8F%88%E6%B2%A1%E5%9B%BE%E4%BA%86%EF%BC%8C%E7%9C%9F%E8%AE%A9%E4%BA%BA%E9%B8%A1%E5%8A%A8.gif',
                article_date:'2018-1-2',
                article_tag:'asdads',
                article_comments:[],
                article_content:'asdadasdasdasdasdasasdadasdasdasdasdasasdadasdasdasdasdasasdadasdasdasdasdas\r\nasdasdasds<img src="asdasda.com"/><br/>',
                article_click:100,
                article_type:0,
            }])
        },100)
    },
    'POST /message':(req,res) =>{
        setTimeout(() => {
            res.json({
                "id": 23,
                "email": "yzoli@163.com",
                "name": "asas",
                "type": 0,
                "articleid": 4,
                "content": "asa<a href=\"#message6\">@&lt;div&gt;zzz&lt;/div&gt;</a>&lt;name&gt;&lt;div&gt;",
                "imgUrl": "/corver/user.png",
                "isAudit": 0,
                "createTime": "2018-11-02T08:50:50.404Z"
            })
        },1900)
    }
}
/* 
res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('Error 404:resource not found');
    res.end(); */