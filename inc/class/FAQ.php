<?php

namespace NOVA_B2B;

class FAQ {
	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;

	/**
	 * Instance Control
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Class Constructor.
	 */
	public function __construct() {
		add_action( 'kadence_single_content', array( $this, 'element_display' ), 1 );
		add_shortcode( 'faq_breadcrumbs', array( $this, 'output_breadcrumbs' ) );
		add_shortcode( 'faq_content', array( $this, 'output_content' ) );
		add_shortcode( 'faq_sub_categories', array( $this, 'output_sub_categories' ) );
		add_shortcode( 'faq_sidebar', array( $this, 'output_sidebar' ) );
		add_shortcode( 'faq_search', array( $this, 'output_search' ) );
		add_shortcode( 'faq_search_results', array( $this, 'output_search_results' ) );

		add_action( 'after_setup_theme', array( $this, 'create_faq_nav_menu' ), 20 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'init', array( $this, 'register_faq_nav_menu' ) );
		add_action( 'admin_menu', array( $this, 'add_faq_menu_submenu_page' ) );
		add_action( 'admin_init', array( $this, 'handle_faq_menu_update' ) );
		/** when save post of nova-faq post type, run create_faq_nav_menu */
		add_action( 'save_post_nova-faq', array( $this, 'create_faq_nav_menu' ), 10, 2 );
		add_action( 'save_post_nova-faq', array( $this, 'update_has_child_meta' ), 10, 2 );
		add_filter( 'wp_nav_menu_objects', array( $this, 'add_custom_class_to_menu_items' ), 10, 2 );
		add_filter( 'body_class', array( $this, 'add_custom_class_to_body' ) );

		add_action( 'nova_product_faqs', array( $this, 'nova_product_faqs' ) );
	}

	public function nova_product_faqs() {
		$faqs = get_field( 'faq_questions' );

		if ( $faqs ) {
			?>
<div id="faqItems" class="has-faq accordion">
	<h2 class="uppercase text-center mb-10">Frequently asked Questions</h2>
			<?php
			foreach ( $faqs as $faq ) {
				?>
	<div class="faq-item visible">
		<p class="faq-question mb-0"><?php echo $faq->post_title; ?> <svg width="14" height="14" viewBox="0 0 14 14"
				fill="none" xmlns="http://www.w3.org/2000/svg">
				<line x1="7" y1="1" x2="7" y2="13" stroke="black" stroke-width="2" stroke-linecap="round">
				</line>
				<line x1="13" y1="7" x2="1" y2="7" stroke="black" stroke-width="2" stroke-linecap="round">
				</line>
			</svg></p>
		<div class="expander">
			<div class="expander-content">
				<div class="content-wrapper">
					<div class="post-content-container" style="padding-top: 2em;">
						<?php echo $faq->post_content; ?>
					</div>
				</div>
			</div>
		</div>
	</div>
				<?php
			}
			?>
</div>
			<?php
		}
	}

	public function add_custom_class_to_menu_items( $items, $args ) {
		global $post;

		if ( is_singular( 'nova-faq' ) ) {
			$parent_id = $post->post_parent;

			foreach ( $items as &$item ) {

				$url = url_to_postid( $item->url );

				if ( $url == $parent_id ) {
					$item->classes[] = 'page-item-parent';
				}
			}
		}
		return $items;
	}

	public function add_custom_class_to_body( $classes ) {
		global $post;
		if ( is_singular( 'nova-faq' ) && isset( $post->post_parent ) ) {
			$parent_id = $post->post_parent;
			$classes[] = 'page-item-' . $parent_id;
		}
		return $classes;
	}


	function update_has_child_meta( $post_id ) {
		if ( get_post_type( $post_id ) == 'nova-faq' ) {
			$children = get_posts(
				array(
					'post_type'   => 'nova-faq',
					'post_parent' => $post_id,
					'numberposts' => 1,
					'fields'      => 'ids',
				)
			);

			if ( ! empty( $children ) ) {
				update_post_meta( $post_id, '_has_child', '1' );
			} else {
				delete_post_meta( $post_id, '_has_child' );
			}
		}
	}

	public function output_search() {
		ob_start();
		$search_term = isset( $_GET['faq'] ) ? $_GET['faq'] : '';
		?>
<div class="max-w-[550px] mx-auto w-full mt-4">
	<form action="<?php echo home_url( '/faq/' ); ?>" method="get"
		class="text-gray-500 border border-gray-200 rounded-md p-1 flex items-center justify-between border-solid">
		<input class="placeholder:text-slate-400 border-0  flex-1 outline-0 focus:border-0" style="box-shadow: none;"
			type="text" name="faq" placeholder="TYPE A QUESTION" value="<?php echo $search_term; ?>">
		<button class="bg-transparent" type="submit" class="text-gray-500">
			<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M4.82857 0C6.10919 0 7.33735 0.547855 8.24289 1.52304C9.14842 2.49823 9.65714 3.82087 9.65714 5.2C9.65714 6.488 9.21886 7.672 8.49829 8.584L8.69886 8.8H9.28571L13 12.8L11.8857 14L8.17143 10V9.368L7.97086 9.152C7.124 9.928 6.02457 10.4 4.82857 10.4C3.54795 10.4 2.31979 9.85215 1.41426 8.87696C0.508723 7.90177 0 6.57913 0 5.2C0 3.82087 0.508723 2.49823 1.41426 1.52304C2.31979 0.547855 3.54795 0 4.82857 0ZM4.82857 1.6C2.97143 1.6 1.48571 3.2 1.48571 5.2C1.48571 7.2 2.97143 8.8 4.82857 8.8C6.68571 8.8 8.17143 7.2 8.17143 5.2C8.17143 3.2 6.68571 1.6 4.82857 1.6Z"
					fill="#D2D2D2" />
			</svg>
		</button>
	</form>
</div>
		<?php
		return ob_get_clean();
	}

	public function handle_faq_menu_update() {
		if ( isset( $_POST['update_faq_menu'] ) && check_admin_referer( 'update_faq_menu', 'update_faq_menu_nonce' ) ) {
			$this->create_faq_nav_menu();
			wp_redirect( admin_url( 'edit.php?post_type=nova-faq&page=faq-menu-settings&updated=true' ) );
			exit;
		}
	}

	public function add_faq_menu_submenu_page() {
		add_submenu_page(
			'edit.php?post_type=nova-faq',
			'FAQ Menu Settings',
			'FAQ Menu Settings',
			'manage_options',
			'faq-menu-settings',
			array( $this, 'faq_menu_settings_page' )
		);
	}

	public function faq_menu_settings_page() {
		?>
<div class="wrap">
	<h1>FAQ Menu Settings</h1>
	<form method="post" action="">
		<?php wp_nonce_field( 'update_faq_menu', 'update_faq_menu_nonce' ); ?>
		<p><input type="submit" name="update_faq_menu" class="button-primary" value="Update FAQ Menu"></p>
	</form>
</div>
		<?php
	}

	public function register_faq_nav_menu() {
		register_nav_menu( 'faq-menu', __( 'FAQ Menu' ) );
	}

	public function enqueue_scripts() {
		wp_register_style( 'nova-faq', get_stylesheet_directory_uri() . '/assets/css/faq.css', array(), wp_get_theme()->get( 'Version' ) );
		if ( is_singular( 'nova-faq' ) || is_page( 'faq' ) ) {
			wp_enqueue_style( 'nova-faq' );
		}
	}

	public function output_sidebar() {
		ob_start();
		wp_nav_menu(
			array(
				'theme_location' => 'faq-menu',
			)
		);

		return ob_get_clean();
	}

	public function create_faq_nav_menu() {
		$menu_name   = 'FAQ Menu';
		$menu_exists = wp_get_nav_menu_object( $menu_name );

		if ( ! $menu_exists ) {
			$menu_id = wp_create_nav_menu( $menu_name );
		} else {
			$menu_id = $menu_exists->term_id;
			wp_delete_nav_menu( $menu_name );
			$menu_id = wp_create_nav_menu( $menu_name );
		}

		$parent_faqs = get_posts(
			array(
				'post_type'   => 'nova-faq',
				'post_parent' => 0,
				'numberposts' => -1,
				'orderby'     => 'menu_order',
				'order'       => 'ASC',
			)
		);

		foreach ( $parent_faqs as $parent_faq ) {
			$child_faqs = get_posts(
				array(
					'post_type'   => 'nova-faq',
					'post_parent' => $parent_faq->ID,
					'numberposts' => -1,
					'orderby'     => 'menu_order',
					'order'       => 'ASC',
				)
			);

			if ( ! empty( $child_faqs ) ) {
				$parent_item_id = wp_update_nav_menu_item(
					$menu_id,
					0,
					array(
						'menu-item-title'  => $parent_faq->post_title,
						'menu-item-url'    => get_permalink( $parent_faq->ID ),
						'menu-item-status' => 'publish',
					)
				);

				foreach ( $child_faqs as $child_faq ) {
						wp_update_nav_menu_item(
							$menu_id,
							0,
							array(
								'menu-item-title'     => $child_faq->post_title,
								'menu-item-url'       => get_permalink( $child_faq->ID ),
								'menu-item-status'    => 'publish',
								'menu-item-parent-id' => $parent_item_id,
							)
						);
				}
			}
		}

		$locations             = get_theme_mod( 'nav_menu_locations' );
		$locations['faq-menu'] = $menu_id;
		set_theme_mod( 'nav_menu_locations', $locations );
	}

	public function output_search_results() {
		ob_start();
		$search_term = isset( $_GET['faq'] ) && ! ( empty( $_GET['faq'] ) ) ? $_GET['faq'] : '';
		?>
<h4 class="mb-9">SEARCH RESULTS FOR <span class="font-body">"<?php echo $search_term; ?>"</span></h4>
		<?php

		$args = array(
			'post_type'      => 'nova-faq',
			'posts_per_page' => -1,
			's'              => $search_term,
			'meta_query'     => array(
				'relation' => 'OR',
				array(
					'key'     => '_has_child',
					'compare' => 'NOT EXISTS',
				),
				array(
					'key'     => '_has_child',
					'value'   => '',
					'compare' => '=',
				),
			),
		);

		$faqs = new \WP_Query( $args );

		if ( $faqs->have_posts() ) {
			echo '<ul class="list-none p-0 ml-0">';
			while ( $faqs->have_posts() ) {
				$faqs->the_post();
				?>
<li class="py-2">
	<a style="text-decoration: none;"
		class="decoration-none text-[14px] text-black underline-offset-2 hover:text-gray-700"
		href="<?php echo get_permalink( get_the_ID() ); ?>"><?php echo get_the_title( get_the_ID() ); ?></a>
</li>
				<?php
			}
			echo '</ul>';
			wp_reset_postdata();
		} else {
			echo '<div class="border border-solid border-[#D2D2D2] text-black pr-4 pl-10 py-3 rounded relative inline-block" role="alert">
  <strong class="font-bold">Nothing Found.</strong>
  <span class="block sm:inline">Try searching for something else.</span>
  <span class="absolute top-0 bottom-0 left-0 px-4 py-3">
    <svg class="fill-current h-6 w-6 text-nova-primary" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>';
		}

		return ob_get_clean();
	}

	public function output_sub_categories() {
		ob_start();
		?>
		<?php
		if ( is_singular( 'nova-faq' ) ) {
			if ( $this->has_children( get_the_ID() ) ) {
				$args     = array(
					'post_parent' => get_the_ID(),
					'post_type'   => 'nova-faq',
					'order'       => 'ASC',
					'orderby'     => 'menu_order',
					'numberposts' => -1,
				);
				$children = get_posts( $args );
				if ( $children ) {
					echo '<h4 class="mb-9">' . get_the_title() . '</h4>';
					echo '<ul class="list-none p-0 ml-0">';
					foreach ( $children as $child ) {
						?>
<li class="py-2">
	<a style="text-decoration: none;"
		class="decoration-none text-[14px] text-black underline-offset-2 hover:text-gray-700"
		href="<?php echo get_permalink( $child->ID ); ?>"><?php echo get_the_title( $child->ID ); ?></a>
</li>
						<?php
					}
					echo '</ul>';
				}
			} else {
				echo '<h4 class="mb-9">' . get_the_title() . '</h4>';
				echo get_the_content();
			}
		} else {
			echo $this->output_search_results();
		}
		return ob_get_clean();
	}




	public function output_content() {
		ob_start();
		?>
<h4 class="mb-9"><?php the_title(); ?></h4>
		<?php
		echo get_the_content();
		return ob_get_clean();
	}

	public function content_display( $value, $element ) {
		$faq_element = get_field( 'faq_element', 'option' );

		if ( empty( $faq_element ) ) {
			return $value;
		}

		if ( $element->ID != $faq_element ) {
			return $value;
		}

		if ( ! is_page( 'faq' ) ) {
			return $value;
		}

		if ( ! isset( $_GET['faq'] ) || ! empty( $_GET['faq'] ) ) {
			return $value;
		}

		return true;
	}

	public function output_breadcrumbs() {
		global $post;
		$seperator = '<li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="currentColor" class="size-3">
  <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
</svg>

</li>';

		$breadcrumbs  = '<nav class="faq-breadcrumbs mb-14 py-4"><ol class="list-none p-0 ml-0 rounded flex bg-grey-light text-grey items-center">';
		$homeLink     = home_url( '/faq/' );
		$breadcrumbs .= '<li class="px-2"><a class="text-[14px] text-black underline-offset-2 hover:text-gray-700" href="' . $homeLink . '">HELP CENTER</a></li>';
		if ( is_singular( 'nova-faq' ) && $post->post_parent ) {
			$parent_id    = $post->post_parent;
			$parent_pages = array();
			while ( $parent_id ) {
				$page           = get_post( $parent_id );
				$parent_pages[] = $seperator . '<li class="px-2"><a class="text-[14px] text-black underline-offset-2 hover:text-gray-700" href="' . get_permalink( $page->ID ) . '">' . get_the_title( $page->ID ) . '</a></li>';
				$parent_id      = $page->post_parent;
			}
			$parent_pages = array_reverse( $parent_pages );
			foreach ( $parent_pages as $parent_page ) {
				$breadcrumbs .= $parent_page;
			}
		}

		$breadcrumbs .= '</ol></nav>';

		return $breadcrumbs;
	}

	public function has_children( $post_id ) {
		$args = array(
			'post_parent' => $post_id,
			'post_type'   => 'any',
			'numberposts' => 1, // We only need to check if at least one child exists
		);

		$children = get_posts( $args );

		if ( ! empty( $children ) ) {
			return true;
		} else {
			return false;
		}
	}

	public function element_display() {

		if ( ! is_page( 'faq' ) ) {
			return;
		}

		if ( ! isset( $_GET['faq'] ) || empty( $_GET['faq'] ) ) {
			return;
		}

		remove_action( 'kadence_single_content', 'Kadence\single_content' );
		add_filter( 'kadence_element_display', array( $this, 'content_display' ), 20, 2 );
		add_action(
			'kadence_single_content',
			function () {
				$faq_element = get_field( 'faq_search_element', 'option' );
				if ( empty( $faq_element ) ) {
					return;
				}
				echo do_shortcode( '[kadence_element id="' . $faq_element . '"]' );
			}
		);
		remove_filter( 'kadence_element_display', array( $this, 'content_display' ), 20, 2 );
	}
}
