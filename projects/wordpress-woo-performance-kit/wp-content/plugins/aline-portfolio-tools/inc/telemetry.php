<?php
declare(strict_types=1);

add_action('rest_api_init', static function (): void {
    register_rest_route('aline/v1', '/diagnostics', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => static fn (): WP_REST_Response => new WP_REST_Response([
            'status' => 'ok',
            'checks' => [
                'wp_debug' => defined('WP_DEBUG') && WP_DEBUG ? 'enabled' : 'disabled',
                'woocommerce' => class_exists('WooCommerce') ? 'active' : 'not_detected',
                'shortcodes' => shortcode_exists('aline_portfolio_status') ? 'registered' : 'missing',
            ],
            'memory_limit' => ini_get('memory_limit'),
            'generated_at' => gmdate('c'),
        ]),
    ]);
});
