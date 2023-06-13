const SITE_CONFIG = {
	siteName: "psyonly's Blog",
	siteLanguage: "zh-Hans",
	description: "psyonly 的个人博客，胡乱写些东西",
	avatarPath: "/dorado.png",
	faviconPath: "/dorado.ico",
	links: [
		{
			type: "GitHub",
			url: "https://github.com/psyonly",
		},
		{
			type: "Email",
			url: "mailto:hi@psyonly.top",
		},
	],
	codeTheme: {
		light: "nord",
		dark: "nord",
	},
	siteUrl: "https://psyonly.top",
	authorName: "psyonly",
	authorLink: "https://psyonly.top",
	authorEmail: "hi@psyonly.top",
	timeZone: "Asia/Shanghai",
	source: "local",
} as const

export default SITE_CONFIG
