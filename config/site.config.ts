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
		{
			type: "CarPT",
			url: "https://carpt.net/promotionlink.php?key=9ffb0be7fd21f49249d5ed104695d627",
		},
	],
	codeTheme: {
		light: "nord",
		dark: "nord",
	},
	siteUrl: "https://blog.psyonly.top",
	authorName: "psyonly",
	authorLink: "https://blog.psyonly.top",
	authorEmail: "hi@psyonly.top",
	timeZone: "Asia/Shanghai",
	source: "local",
} as const

export default SITE_CONFIG
