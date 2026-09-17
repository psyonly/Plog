import AppearanceSwitch from "@/components/ui/AppearanceSwitch"
import Clock from "@/components/ui/Clock"
import IconLink from "@/components/ui/IconLink"
import SITE_CONFIG from "@/config/site.config"

const Footer = () => {
	return (
		<footer className="flex gap-4 opacity-70">
			<AppearanceSwitch />
			<a
				href="/rss.xml"
				className="flex text-2xl"
				target="_blank"
				rel="noopener noreferrer"
			>
				<div className="i-carbon-rss" />
			</a>
			{SITE_CONFIG.links.map((link, index) => (
				<IconLink {...link} key={index} />
			))}
			<a href="https://carpt.net/promotionlink.php?key=9ffb0be7fd21f49249d5ed104695d627">
				<img src="https://carpt.net/pic/prolink.png" alt="CarPT" title="CarPT - =链接@分享=">
			</a>
			<Clock />
		</footer>
	)
}

export default Footer
