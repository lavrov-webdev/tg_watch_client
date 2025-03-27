<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	type Props = {
		isOpen: boolean;
		onClose: () => void;
		children: Snippet;
	};

	const { children, isOpen, onClose }: Props = $props();
	
	let previouslyFocusedElement: HTMLElement | null = null;

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
			previouslyFocusedElement = document.activeElement as HTMLElement;
		} else {
			document.body.style.overflow = '';
			if (previouslyFocusedElement) {
				setTimeout(() => {
					previouslyFocusedElement?.focus();
				}, 0);
			}
		}
	});

	function onEscPress(node: HTMLElement) {
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};
		
		window.addEventListener('keydown', handleKeydown);
		
		return {
			destroy() {
				window.removeEventListener('keydown', handleKeydown);
			}
		};
	}
</script>

{#if isOpen}
	<div use:onEscPress class="modal-container" in:fade={{ duration: 200 }} out:fade={{ duration: 150 }}>
		<div
			onkeydown={onClose}
			role="dialog"
			tabindex="-1"
			aria-modal="true"
			onclick={onClose}
			class="modal-overlay"
			transition:fade={{ duration: 300 }}
		></div>

		<div 
			transition:fly={{ y: 30, duration: 300 }} 
			class="modal-content"
			role="dialog"
			aria-modal="true"
		>
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
