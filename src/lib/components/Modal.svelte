<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	type Props = {
		isOpen: boolean;
		onClose: () => void;
		children: Snippet;
	};

	const { children, isOpen, onClose }: Props = $props();

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			setTimeout(() => {
				document.body.style.overflow = '';
			}, 200);
		}
	});

	const onEscPress = (_: any) => {
		$effect(() => {
			const ac = new AbortController();
			window.addEventListener(
				'keydown',
				(ev) => {
					if (ev.key === 'Escape') {
						onClose();
					}
				},
				{ signal: ac.signal }
			);
			return () => {
				ac.abort();
			};
		});
	};
</script>

{#if isOpen}
	<div use:onEscPress class="modal-container">
		<div
			role="dialog"
			tabindex="0"
			onkeydown={onclose}
			aria-modal="true"
			onclick={onClose}
			class="modal-overlay"
		></div>

		<div class="modal-content">
			{@render children()}
		</div>
	</div>
{/if}

<style>
	.modal-container {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.modal-overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal-content {
		position: relative;
		z-index: 10;
		border-radius: 0.5rem;
		background-color: var(--modal-bg, white);
		padding: 1.5rem;
		box-shadow:
			0 20px 25px -5px rgb(0 0 0 / 0.1),
			0 8px 10px -6px rgb(0 0 0 / 0.1);
	}
</style>
