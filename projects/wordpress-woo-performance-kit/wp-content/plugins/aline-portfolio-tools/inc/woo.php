<?php
declare(strict_types=1);

add_action('woocommerce_before_shop_loop_item_title', static function (): void {
    if (function_exists('is_product') && is_product()) echo '<span class="aline-performance-badge">✓ Disponible</span>';
}, 8);

add_filter('body_class', static function (array $classes): array { $classes[] = 'aline-performance-ready'; return $classes; });
