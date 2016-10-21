var movies = [];

var topGunSearch = [{
  "page": 1,
  "results": [
    {
      "poster_path": "/orGXnBKfT41LxZhitLkXhqUfJJW.jpg",
      "adult": false,
      "overview": "For Lieutenant Pete Mitchell and his friend and Co-Pilot Nick Bradshaw being accepted into an elite training school for fighter pilots is a dream come true.  A tragedy, as well as personal demons, threaten Pete's dreams of becoming an Ace pilot.",
      "release_date": "1986-05-16",
      "genre_ids": [
        18,
        28,
        10749
      ],
      "id": 744,
      "original_title": "Top Gun",
      "original_language": "en",
      "title": "Top Gun",
      "backdrop_path": "/9GyBSsMiGkPSk4OESIYZuedijBI.jpg",
      "popularity": 3.415533,
      "vote_count": 966,
      "video": false,
      "vote_average": 6.56
    },
    {
      "poster_path": "/jCUTPq20pEg5rf3CTGayY9H3nXG.jpg",
      "adult": false,
      "overview": "A gunslinger returns to his hometown to warn of an impending outlaw gang attack, but he's met with hatred and fear for his previous killings.",
      "release_date": "1955-12-01",
      "genre_ids": [
        37
      ],
      "id": 243655,
      "original_title": "Top Gun",
      "original_language": "pt",
      "title": "Top Gun",
      "backdrop_path": "/pCCxl8BWv4oqMifJ1uokDmmRuLJ.jpg",
      "popularity": 1.001332,
      "vote_count": 1,
      "video": false,
      "vote_average": 6
    },
    {
      "poster_path": "/gOh9ZQWBYYpFes6t5FaEzAndqVB.jpg",
      "adult": false,
      "overview": "",
      "release_date": "2016-09-26",
      "genre_ids": [],
      "id": 420685,
      "original_title": "Top Gun 3D",
      "original_language": "it",
      "title": "Top Gun 3D",
      "backdrop_path": null,
      "popularity": 1.170268,
      "vote_count": 0,
      "video": false,
      "vote_average": 0
    },
    {
      "poster_path": null,
      "adult": false,
      "overview": "",
      "release_date": "2008-01-01",
      "genre_ids": [],
      "id": 229690,
      "original_title": "Top Gun - Mission Norge",
      "original_language": "pt",
      "title": "Top Gun - Mission Norge",
      "backdrop_path": null,
      "popularity": 1.000572,
      "vote_count": 0,
      "video": false,
      "vote_average": 0
    },
    {
      "poster_path": null,
      "adult": false,
      "overview": "",
      "release_date": "",
      "genre_ids": [],
      "id": 361743,
      "original_title": "Top Gun 2",
      "original_language": "en",
      "title": "Top Gun 2",
      "backdrop_path": null,
      "popularity": 1.00185,
      "vote_count": 3,
      "video": false,
      "vote_average": 6
    },
    {
      "poster_path": "/4ZP8vd56DgVytCMQlGiQGyGBORt.jpg",
      "adult": false,
      "overview": "Nova visits Russia for Nova: Top Gun Over Moscow, a thorough look at the sleekest and most powerful Russian jets. In a word, they are tough. These jets are engineered quite differently from their American counterparts. They function well in adverse conditions, able to take off from open dirt fields, and their continuous operation doesn't depend on regular maintenance. The U.S. jet is finely tuned, requiring more frequent upkeep, but definitely having a high-tech edge, particularly in the areas of radar and missile guidance. Interviews with pilots reveal a very different outlook between the two countries on training goals.",
      "release_date": "2006-10-23",
      "genre_ids": [
        99
      ],
      "id": 368986,
      "original_title": "Top Gun Over Moscow",
      "original_language": "en",
      "title": "Top Gun Over Moscow",
      "backdrop_path": null,
      "popularity": 1.000429,
      "vote_count": 0,
      "video": true,
      "vote_average": 0
    },
    {
      "poster_path": "/ubXETzHwOfrGRHZ969NuuLG5GGb.jpg",
      "adult": false,
      "overview": "A comprehensive documentary on the making of Top Gun featuring all-new interviews with the cast and crew.",
      "release_date": "2004-12-14",
      "genre_ids": [
        99
      ],
      "id": 50559,
      "original_title": "Danger Zone: The Making of 'Top Gun'",
      "original_language": "en",
      "title": "Danger Zone: The Making of 'Top Gun'",
      "backdrop_path": null,
      "popularity": 1.000286,
      "vote_count": 0,
      "video": false,
      "vote_average": 0
    },
    {
      "poster_path": "/wGqVEESL6zmuXUQxpYA7XaukdEk.jpg",
      "adult": false,
      "overview": "After he performs a dangerous dare-devil stunt at an air show, South Korean Air Force pilot Tae-hun is kicked out of the elite Black Eagles flying team and transferred to a combat unit where he immediately comes into conflict with ace pilot Cheol-hui. He makes friends with the other pilots in the unit and falls in love with the beautiful Se-young, who is in charge of maintenance, but his antics soon cause the entire unit to be suspended from duty. When a North Korean MIG fighter threatens, the group is called back into a gripping dogfight that leaves one comrade dead and another missing. Cheol-hui and Tae-hun join forces to rescue their missing friend and prevent a catastrophic war.",
      "release_date": "2012-08-14",
      "genre_ids": [
        28,
        18,
        10749
      ],
      "id": 124294,
      "original_title": "알투비:리턴투베이스",
      "original_language": "ko",
      "title": "R2B: Return to Base",
      "backdrop_path": "/bULgxk2q8ZaQSNLUmeDqDRCNLWA.jpg",
      "popularity": 1.956452,
      "vote_count": 18,
      "video": false,
      "vote_average": 5.53
    },
    {
      "poster_path": "/n9mOkomYwF7SkWrJDRCYLyzWNjv.jpg",
      "adult": false,
      "overview": "The best fighter? Was it the venerable Sopwith Camel of WWI? The Messerschmitt BF 109 or the P-51 of WWII? Or does the title belong to the F-86 Sabre, F-4 Phantom, F-14 Tomcat, F-16 Falcon or any one of a dozen other great fighters? You be the judge!",
      "release_date": "",
      "genre_ids": [
        99
      ],
      "id": 62584,
      "original_title": "Top Guns - Fighters",
      "original_language": "en",
      "title": "Top Guns - Fighters",
      "backdrop_path": null,
      "popularity": 1.05,
      "vote_count": 0,
      "video": false,
      "vote_average": 0
    },
    {
      "poster_path": "/xm99QwEW40ZOn2gsOB1X8vhjjGP.jpg",
      "adult": false,
      "overview": "How do the experts judge a bomber? Find out whether the Zepplin, Heinkel HE-111, Boeing B-29, Corvair B-36, Boeing B-52 or Rockwell B-1 or one of the other great bombers will earn the title \"Best of the Best\".",
      "release_date": "",
      "genre_ids": [
        99
      ],
      "id": 62587,
      "original_title": "Top Guns - Bombers",
      "original_language": "en",
      "title": "Top Guns - Bombers",
      "backdrop_path": null,
      "popularity": 1.000074,
      "vote_count": 0,
      "video": false,
      "vote_average": 0
    },
    {
      "poster_path": "/v6X0PEw4DwGLM65nrdVA9Y4uWTQ.jpg",
      "adult": false,
      "overview": "In the near future, humanity has taken its first steps towards journeying into the far reaches of the galaxy. Upon doing so they discover a huge race of insectoid aliens known as “Space Monsters.” These aliens seem dedicated to the eradication of mankind as they near closer and closer to discovering Earth. In response, humanity develops giant fighting robots piloted by hand-picked youth from around the world.  Shortly after the discovery of the aliens, Noriko Takaya, the daughter of a famous deceased space captain, enters a training school despite her questionable talents as a pilot. There, she meets her polar opposite, the beautiful and talented Kazumi Amano, and is unexpectedly made to work together with her as they attempt to overcome the trauma of war as well as their own emotions.",
      "release_date": "",
      "genre_ids": [],
      "id": 420625,
      "original_title": "Top wo Nerae: Gunbuster",
      "original_language": "en",
      "title": "Top wo Nerae: Gunbuster",
      "backdrop_path": null,
      "popularity": 1.00216,
      "vote_count": 0,
      "video": false,
      "vote_average": 0
    },
    {
      "poster_path": "/gA8JYolAfEeQeZE6F6EP8szdjs3.jpg",
      "adult": false,
      "overview": "Top attack aircraft? Cast your vote for the Sopwith Salamander, A-20 Havoc, P-47 Thunderbolt, F9F Panther, F-105 Thunderchief, or the A-10 Thunderbolt II and more. Which one ruled the skies in its time?",
      "release_date": "",
      "genre_ids": [
        99
      ],
      "id": 62588,
      "original_title": "Top Guns - Attack Aircraft",
      "original_language": "en",
      "title": "Top Guns - Attack Aircraft",
      "backdrop_path": null,
      "popularity": 1.000017,
      "vote_count": 0,
      "video": false,
      "vote_average": 0
    },
    {
      "poster_path": "/45qPQdJmt5JtLKdviZrLhXMDXVx.jpg",
      "adult": false,
      "overview": "This double feature comprises of Gunbuster and Die Buster (aka Gunbuster 2) condensed them into a single theatrical release told in two parts with a musical intermission in between. The first part, Gunbuster the Movie, condenses the six episodes of the original OVA into a 95-minute moviefeaturing a new 5.1 audio remix and a redub by the original Japanese cast. The second part, Die Buster the Movie, mixes large chunks of the second OVA series with a few altered or newly-animated scenes to create a truncated take on Nono's story.",
      "release_date": "2006-10-01",
      "genre_ids": [
        16,
        12,
        18
      ],
      "id": 30146,
      "original_title": "トップをねらえ！＆トップをねらえ２！合体劇場版!!",
      "original_language": "ja",
      "title": "Gunbuster vs Diebuster Aim for the Top! The GATTAI!! Movie",
      "backdrop_path": "/95xiQFue2PXrDOUJJemfdZfQWd5.jpg",
      "popularity": 1.007582,
      "vote_count": 5,
      "video": false,
      "vote_average": 6.5
    },
    {
      "poster_path": "/6MKKk0QaTLBMfkXoMkD42XW4iUD.jpg",
      "adult": false,
      "overview": "No. 1 is fearless, irrestible, and licensed to kill. No. 1 is assigned to capture a madman killing international financiers. Before getting the bad guy, No. 1 encounters mercenaries from the evil organization K.R.A.S.H. (Killing, Rape, Arson, Slaughter, and Hit).",
      "release_date": "1978-04-01",
      "genre_ids": [
        28,
        35
      ],
      "id": 95094,
      "original_title": "No. 1 of the Secret Service",
      "original_language": "en",
      "title": "No. 1 of the Secret Service",
      "backdrop_path": null,
      "popularity": 1.00486,
      "vote_count": 0,
      "video": false,
      "vote_average": 0
    }
  ],
  "total_results": 14,
  "total_pages": 1
}];