<template>
	<teleport
		v-if="isVisible"
		to="header"
	>
		<div
			class="ui-modal"
			tabindex="0"
			@keydown.esc="escHandler"
			@click="closeModal"
		>
			<div
				class="ui-modal__content"
				@click.stop
			>
				<button
					ref="portalContent"
					type="button"
					class="ui-modal__close"
					@click="closeModal"
				>
					<svg
						width="28"
						height="28"
						viewBox="0 0 28 28"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M8.16699 8.1665L19.8337 19.8332M8.16699 19.8332L19.8337 8.1665" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>

				<slot></slot>
			</div>
		</div>
	</teleport>
</template>

<script setup lang="ts">
	import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits, watch } from 'vue';

	const props = defineProps({
		isVisible: {
			type: Boolean,
			default: false
		}
	});

	const emit = defineEmits(['ui-modal-close']);

	const portalContent = ref<HTMLElement | null>(null);

	const closeModal = () => {
		emit('ui-modal-close');
	};

	const escHandler = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			closeModal();
		}
	};

	watch(() => props.isVisible, (newValue) => {
		if (newValue && portalContent.value) {
			setTimeout(() => {
				portalContent.value?.focus();
			}, 100);
		}
	});

	onMounted(() => {
		if (props.isVisible && portalContent.value) {
			setTimeout(() => {
				portalContent.value?.focus();
			}, 100);
		}

		window.addEventListener('keydown', escHandler);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('keydown', escHandler);
	});
</script>

<style lang="scss">
	.ui-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--modal-bac-color);
		display: flex;
		justify-content: center;
		align-items: center;
		outline: none;
	}

	.ui-modal__content {
		background-color: var(--main-light-color);
		padding: 16px;
		border-radius: var(--border-radius-min);
		position: relative;
		width: 90%;
		z-index: 1;
		animation: start .3s ease-in-out;

		@include media(md) {
			width: 100%;
			max-width: 533px;
			padding: 40px;
		}
	}

	.ui-modal__close {
		position: absolute;
		top: 8px;
		right: 8px;
		border: none;
		background: none;
		font-size: 20px;
		cursor: pointer;
		color: var(--main-dark-color);

		&:hover,
		&:focus {
			opacity: 0.5;
		}

		@include media(md) {
			top: 16px;
			right: 16px;
		}
	}

	@keyframes start {
		0% {
			opacity: 0;
			transform: translateY(100px);
		}

		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>