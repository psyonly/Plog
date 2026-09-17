import { cn } from "@/lib/utils"

export default function IconLink({
	type,
	url,
	className = "",
	iconOnly = false,
}: {
	type: "GitHub" | "Twitter" | "Email" | "LeetCode" | "CarPT"
	url: string
	className?: string
	iconOnly?: boolean
}) {
	const icon = (
		<div
			className={cn(
				type === "GitHub"
					? "i-carbon-logo-github"
					: type === "Twitter"
					? "i-carbon-logo-twitter"
					: type === "Email"
					? "i-carbon-email"
					: type === "LeetCode"
					? "i-carbon-logo-wechat"
					: type === "CarPT"
					? "i-carbon-vehicle-api"
					: "",
				className
			)}
		></div>
	)

	if (iconOnly) {
		return icon
	}

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="flex text-2xl"
		>
			{icon}
		</a>
	)
}
