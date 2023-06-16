import { CodeBlock } from "@/components/part/NotionPostContent"
import Prose from "@/components/ui/Prose"
import { LocalPost } from "@/types/post"
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc"
import Link from "next/link"

const components: MDXRemoteProps["components"] = {
	a: (props) => {
		if (props.href && !props.href.startsWith("http")) {
			return <Link href={props.href}>{props.children}</Link>
		}
		return (
			<span className="not-prose">
				<a
					{...props}
					target="_blank"
					rel="noopener noreferrer"
					className="mr-px border-b border-neutral-300 hover:border-neutral-600 dark:border-neutral-600 dark:hover:border-neutral-300"
				>
					{props.children}
				</a>
				<sup>↗</sup>
			</span>
		)
	},
	pre: (props) => {
		return (
			/* @ts-expect-error Server Component */
			<CodeBlock
				block={{
					code: {
						/* @ts-expect-error render code */
						rich_text: props.children.props.children,
						language:
							/* @ts-expect-error render code */
							props.children.props.className?.replace("language-", "") || "",
					},
				}}
			/>
		)
	},
	code: (props) => {
		return (
			<span className="not-prose">
				<code
					{...props}
					className="rounded border border-neutral-200 bg-neutral-100 px-[2px] py-[1px] font-mono text-sm opacity-80 dark:border-neutral-700 dark:bg-neutral-800"
				></code>
			</span>
		)
	},
}

export default function MdxPostContent({ content, metadata }: LocalPost) {
	let tags = "Tags: "
	metadata.tags.map((item, i) =>{ if(i>0){tags += ", "} tags += item })
	return (
		<Prose>
			<h3>{metadata.title}</h3>
			<small>Create@{metadata.date} | Update@{metadata.updated}</small>
			<b>{tags}</b>
			<p>{metadata.description}</p>
			<br/>
			{/* <img src="/images/earth_1.jpg" alt="x_store"/> */}
			{/* @ts-expect-error Server Component */}
			<MDXRemote source={content} components={components} />
		</Prose>
	)
}
