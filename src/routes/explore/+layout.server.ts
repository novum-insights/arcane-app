import type { Load } from "@sveltejs/kit";
import { block } from "$lib/client/api";

export const load: Load = async () => {
	const block_height = await block()

	const links = [
		{
			link: 'top-collectors',
			text: 'Top Collectors',
			color: '#0569a0',
			icon: `<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-[3em] h-[3em]"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
				/>
			</svg>`
		},
		// {
		//     link: 'top-losers',
		//     text: 'Top Losers',
		//     color: 'amber',
		//     icon: `<svg
		// 		xmlns="http://www.w3.org/2000/svg"
		// 		fill="none"
		// 		viewBox="0 0 24 24"
		// 		stroke-width="1.5"
		// 		stroke="currentColor"
		// 		class="w-[3em] h-[3em]"
		// 	>
		// 		<path
		// 			stroke-linecap="round"
		// 			stroke-linejoin="round"
		// 			d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
		// 		/>
		// 	</svg>`
		// },
		{
			link: 'trending-collections',
			text: 'Trending collections',
			color: '#17803d',
			icon: `<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-[3em] h-[3em]"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
				/>
			</svg>`
		},
		{
			link: 'defi',
			text: 'Defi/Market',
			color: '#0e766e',
			icon: `<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-[3em] h-[3em]"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
				/>
			</svg>`
		}
	];
	
	return {
		links,
		block_height
	}
}

