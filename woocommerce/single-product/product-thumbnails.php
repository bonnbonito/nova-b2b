<?php
/**
 * Single Product Thumbnails
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/product-thumbnails.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://docs.woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     3.5.1
 */

defined( 'ABSPATH' ) || exit;

// Note: `wc_get_gallery_image_html` was added in WC 3.3.2 and did not exist prior. This check protects against theme overrides being used on older versions of WC.
if ( ! function_exists( 'wc_get_gallery_image_html' ) ) {
	return;
}

global $product;

$post_thumbnail_id = $product->get_image_id();
$attachment_ids    = $product->get_gallery_image_ids();

if ( isset( $post_thumbnail_id ) && ! empty( $post_thumbnail_id ) ) {
	$all_imgs = array_unique( array_merge( $attachment_ids, array( $post_thumbnail_id ) ) );
}


if ( $all_imgs ) {
	?>
<div id="galleryNav" class="nav-gallery splide">
	<div class="splide__track">
		<ul class="splide__list">

			<li class="splide__slide hineon-product-gallery__image">
				<?php the_post_thumbnail( 'thumbnail' ); ?>
			</li>

			<?php
			foreach ( $attachment_ids as $attachment_id ) {
				$thumbnail  = wp_get_attachment_image_src( $attachment_id, 'shop_thumbnail' );
				$attributes = array(
					'title'                   => get_post_field( 'post_title', $attachment_id ),
					'data-caption'            => get_post_field( 'post_excerpt', $attachment_id ),
					'data-src'                => $thumbnail[0],
					'data-large_image'        => $thumbnail[0],
					'data-large_image_width'  => $thumbnail[1],
					'data-large_image_height' => $thumbnail[2],
				);

				$has_video   = get_field( 'video__popup', $attachment_id );
				$video_class = $has_video ? 'video-popup' : '';

				$html  = '<li data-thumb="' . esc_url( $thumbnail[0] ) . '" class="nav-gallery-item splide__slide ' . $video_class . '">';
				$html .= wp_get_attachment_image( $attachment_id, 'nav-thumb', false, $attributes );
				$html .= '</li>';

				echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', $html, $attachment_id ); // phpcs:disable WordPress.XSS.EscapeOutput.OutputNotEscaped
			}
			?>
		</ul>
	</div>
	<div class="splide__arrows">
		<button class="splide__arrow splide__arrow--prev">
			<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M17.5438 11.8711C17.0958 11.6611 16.7038 11.4581 16.3678 11.2621C16.0318 11.0521 15.7518 10.8491 15.5278 10.6531L15.5278 22.8961L14.6458 22.8961L14.6458 10.6531C14.4078 10.8491 14.1208 11.0521 13.7848 11.2621C13.4488 11.4581 13.0638 11.6611 12.6298 11.8711L12.6298 11.1361C13.6518 10.2541 14.4078 9.33007 14.8978 8.36407L15.2758 8.36407C15.7518 9.33007 16.5078 10.2541 17.5438 11.1361L17.5438 11.8711Z"
					fill="black" />
				<circle cx="15.5" cy="15.5" r="15" transform="rotate(-90 15.5 15.5)" stroke="black" />
			</svg>


		</button>
		<button class="splide__arrow splide__arrow--next">
			<svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M14.0771 19.1289C14.5251 19.3389 14.9171 19.5419 15.2531 19.7379C15.5891 19.9479 15.8691 20.1509 16.0931 20.3469L16.0931 8.10393L16.9751 8.10393L16.9751 20.3469C17.2131 20.1509 17.5001 19.9479 17.8361 19.7379C18.1721 19.5419 18.5571 19.3389 18.9911 19.1289L18.9911 19.8639C17.9691 20.7459 17.2131 21.6699 16.7231 22.6359L16.3451 22.6359C15.8691 21.6699 15.1131 20.7459 14.0771 19.8639L14.0771 19.1289Z"
					fill="black" />
				<circle cx="16.1206" cy="15.5" r="15" transform="rotate(90 16.1206 15.5)" stroke="black" />
			</svg>

		</button>
	</div>
</div>
	<?php
}
