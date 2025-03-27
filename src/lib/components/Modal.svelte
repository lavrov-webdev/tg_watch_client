<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	type Props = {
		isOpen: boolean;
		onClose: () => void;
		children: Snippet;
	};

	const { children, isOpen, onClose }: Props = $props();
	
	let modalContent: HTMLElement;
	let previouslyFocusedElement: HTMLElement | null = null;
	let focusableElements: HTMLElement[] = [];

	function getFocusableElements(element: HTMLElement): HTMLElement[] {
		return Array.from(
			element.querySelectorAll(
				'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
			)
		) as HTMLElement[];
	}

	function focusTrap(node: HTMLElement) {
		const updateFocusableElements = () => {
			focusableElements = getFocusableElements(node);
			console.log('Focusable elements updated:', focusableElements.length);
		};

		const handleKeydown = (event: KeyboardEvent) => {
			if (!isOpen) return;
			
			if (event.key === 'Tab') {
				updateFocusableElements();
				
				if (focusableElements.length === 0) return;

				const firstFocusableElement = focusableElements[0];
				const lastFocusableElement = focusableElements[focusableElements.length - 1];

				const isActiveElementInModal = node.contains(document.activeElement);
				
				if (!isActiveElementInModal) {
					event.preventDefault();
					firstFocusableElement.focus();
					return;
				}

				if (event.shiftKey && document.activeElement === firstFocusableElement) {
					event.preventDefault();
					lastFocusableElement.focus();
				} 
				else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
					event.preventDefault();
					firstFocusableElement.focus();
				}
			}
		};

		setTimeout(updateFocusableElements, 0);
		
		document.addEventListener('keydown', handleKeydown, true);

		const observer = new MutationObserver(() => {
			setTimeout(updateFocusableElements, 0);
		});
		
		observer.observe(node, { 
			childList: true, 
			subtree: true,
			attributes: true,
			attributeFilter: ['tabindex', 'disabled']
		});

		return {
			destroy() {
				document.removeEventListener('keydown', handleKeydown, true);
				observer.disconnect();
			},
			update() {
				setTimeout(updateFocusableElements, 0);
			}
		};
	}

	function setInitialFocus() {
		if (!modalContent) return;
		
		focusableElements = getFocusableElements(modalContent);
		console.log('Setting initial focus, elements:', focusableElements.length);
		
		if (focusableElements.length > 0) {
			focusableElements[0].focus();
		} else {
			modalContent.focus();
		}
	}

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
			previouslyFocusedElement = document.activeElement as HTMLElement;
			
			setTimeout(setInitialFocus, 100);
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
			bind:this={modalContent}
			use:focusTrap
			transition:fly={{ y: 30, duration: 300 }} 
			class="modal-content"
			role="dialog"
			aria-modal="true"
			tabindex="0"
			onclick={(e) => e.stopPropagation()}
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
