var config = {
	'bookMenu':[{
	flag:'J',
	name:'教育',
	children:[
		{
			flag:'J',
			name:'教材',
			children:[
				{
					flag:'JG',
					name:'高职高专教材'
				},
				{
					flag: 'JZ',
					name: '中职教材'
				}
			]
		},
		{
			flag:'W',
			name:'外语',
			children:[
				{
					flag:'WK',
					name:'口语'
				}
			]
		}
	]
},
{
	flag: 'W' ,
	name: '文艺',
	children:[
		{
			flag: 'WW',
			name: '文学',
			children: [
				{
					flag: 'WWW',
					name: '文集',
				},
				{
					flag: 'WWG',
					name: '纪实文学',
				}
			]
		},
		{
			flag: 'WZ',
			name: '传记',
			children:[
				{
					flag: 'WZC',
					name: '财经人物',
				},
				{
					flag: 'WZZ',
					name: '政治人物',
				}
			]
		}
	]
	}
	]
}
module.exports = config;