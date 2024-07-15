<template>
	<div class="contact-item">
		<img
			class="contact-item__avatar"
			:src="contact.avatarLink ?? 'avatar-default.jpg'"
			:alt="contact.name"
		/>

		<div class="contact-item__info">
			<h4 class="contact-item__info-title h h--2 f f--5">
				{{ contact.name }}
			</h4>

			<div class="contact-item__contacts">
				<a
					:href="formattedPhoneHref"
					class="contact-item__contact"
				>
					{{ formattedPhone }}
				</a>

				<a
					:href="`mailto:${contact.email}`"
					class="contact-item__contact"
				>
					{{ contact.email }}
				</a>
			</div>
		</div>

		<div class="contact-item__navigation">
			<button
				type="button"
				class="contact-item__navigation-item"
				@click="editContact"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M16 4.99998L19 7.99998M20.385 6.58499C20.7788 6.19114 21.0001 5.65697 21.0001 5.09998C21.0001 4.543 20.7788 4.00883 20.385 3.61498C19.9912 3.22114 19.457 2.99988 18.9 2.99988C18.343 2.99988 17.8088 3.22114 17.415 3.61498L9 12V15H12L20.385 6.58499Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>

			<button
				type="button"
				class="contact-item__navigation-item"
				@click="confirmDeleteContact"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M8.625 4.5V2.25H15.375V4.5H8.625ZM6.375 4.5V1.5C6.375 1.10218 6.53304 0.720644 6.81434 0.43934C7.09564 0.158035 7.47718 0 7.875 0L16.125 0C16.5228 0 16.9044 0.158035 17.1857 0.43934C17.467 0.720644 17.625 1.10218 17.625 1.5V4.5H21.375C21.6734 4.5 21.9595 4.61853 22.1705 4.8295C22.3815 5.04048 22.5 5.32663 22.5 5.625C22.5 5.92337 22.3815 6.20952 22.1705 6.4205C21.9595 6.63147 21.6734 6.75 21.375 6.75H20.8275L19.713 21.2295C19.6552 21.9832 19.315 22.6872 18.7604 23.2009C18.2059 23.7146 17.4779 23.9999 16.722 24H7.278C6.52211 23.9999 5.79411 23.7146 5.23957 23.2009C4.68502 22.6872 4.34483 21.9832 4.287 21.2295L3.1725 6.75H2.625C2.32663 6.75 2.04048 6.63147 1.8295 6.4205C1.61853 6.20952 1.5 5.92337 1.5 5.625C1.5 5.32663 1.61853 5.04048 1.8295 4.8295C2.04048 4.61853 2.32663 4.5 2.625 4.5H6.375ZM5.43 6.75H18.57L17.469 21.057C17.4546 21.2454 17.3697 21.4214 17.2313 21.5498C17.0928 21.6783 16.9109 21.7498 16.722 21.75H7.278C7.0891 21.7498 6.90723 21.6783 6.76875 21.5498C6.63026 21.4214 6.54536 21.2454 6.531 21.057L5.43 6.75Z"
						fill="currentColor"
					/>
				</svg>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits, computed } from 'vue';
	import { User } from '@/types';

	const props = defineProps<{
		contact: User;
	}>();

	const emit = defineEmits<{
		(e: 'edit-contact', contact: User): void;
		(e: 'delete-contact', contact: User): void;
	}>();

	const formatPhone = (phone: string): { display: string; href: string } => {
		const cleaned = phone.replace(/\D/g, '');
		const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
		if (match) {
			return {
				display: `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`,
				href: `+${match[1]}${match[2]}${match[3]}${match[4]}${match[5]}`
			};
		}

		return {
			display: phone,
			href: cleaned
		};
	};

	const formattedPhone = computed(() => formatPhone(props.contact.phone).display);
	const formattedPhoneHref = computed(() => `tel:${formatPhone(props.contact.phone).href}`);

	const editContact = () => {
		emit('edit-contact', props.contact);
	};

	const confirmDeleteContact = () => {
		emit('delete-contact', props.contact);
	};
</script>

<style lang="scss">
	.contact-item {
		display: grid;
		align-items: start;
		height: 100%;
		grid-template-columns: 1fr auto;
		border: 2px solid var(--grey-light-color);
		border-radius: var(--border-radius-min);
		grid-gap: 12px;
		padding: 12px;

		@include media(sm-max) {
			grid-template-rows: 1fr auto;
		}

		@include media(md) {
			grid-template-columns: 32px 1fr 16px;
		}

		@include media(lg) {
			grid-template-columns: 60px 1fr 20px;
			padding: 16px;
		}

		@include media(xl) {
			padding: 20px;
			grid-gap: 20px;
			grid-template-columns: 100px 1fr 24px;
		}
	}

	.contact-item__avatar {
		border-radius: var(--border-radius-min);
		grid-column: 1/2;

		@include media(sm-max) {
			width: 30px;
			height: 30px;
		}
	}

	.contact-item__info {
		display: flex;
		flex-direction: column;
		gap: 12px;

		@include media(sm-max) {
			grid-row: 2/3;
		}

		@include media(lg) {
			gap: 16px;
		}
	}

	.contact-item__info-title {
		margin: 0;
	}

	.contact-item__contacts {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.contact-item__contact {
		color: var(--main-dark-color);
		align-self: flex-start;
		transition: var(--transition);

		&:hover,
		&:focus-visible {
			color: var(--accent-color);
		}
	}

	.contact-item__navigation {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		align-items: center;
		height: 100%;
		gap: 20px;

		@include media(sm-max) {
			grid-column: 3 / 4;
			grid-row: 1 / -1;
		}
	}

	.contact-item__navigation-item {
		color: var(--grey-dark-color);
		cursor: pointer;
		width: 16px;
		height: 16px;
		flex-shrink: 0;

		@include media(md) {
			width: 20px;
			height: 20px;
		}

		@include media(lg) {
			width: 24px;
			height: 24px;
		}

		&:hover,
		&:focus-visible {
			color: var(--accent-color);
		}
	}

	.contact-item-remove-modal__wrapper {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		grid-gap: 20px;
	}

	.contact-item-remove-modal__title {
		grid-column: 1/3;
	}
</style>