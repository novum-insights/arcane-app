<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	$: percentage = 0;
	$: hidden = false;
	beforeNavigate((e) => {
		hidden = false;
		setTimeout(() => {
			let intervalId = setInterval(() => {
				if (percentage < 80) {
					percentage += 1;
				} else {
					clearInterval(intervalId);
				}
			}, 10);
		});
	});
	afterNavigate((e) => {
		percentage = 0;
		hidden = true;
	});
</script>

<div class="absolute h-1 bg-sky-400" style:width="{percentage}%" class:hidden />
