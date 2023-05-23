const SITE_CONFIG = {
	siteName: "psyonly's Blog",
	siteLanguage: "zh-Hans",
	description: "psyonly 的个人博客，胡乱写些东西",
	avatarPath: "/Dorado.png",
	faviconPath: "/favicon.svg",
	links: [
		{
			type: "GitHub",
			url: "https://github.com/psyonly",
		},
		{
			type: "Twitter",
			url: "https://twitter.com/psyonly",
		},
		{
			type: "Email",
			url: "mailto:hi@psyonly.cc",
		},
	],
	codeTheme: {
		light: "nord",
		dark: "nord",
	},
	siteUrl: "https://plog-dun.vercel.app",
	authorName: "psyonly",
	authorLink: "https://plog-dun.vercel.app",
	authorEmail: "hi@psyonly.cc",
	timeZone: "Asia/Shanghai",
	source: "local",
} as const

export default SITE_CONFIG
