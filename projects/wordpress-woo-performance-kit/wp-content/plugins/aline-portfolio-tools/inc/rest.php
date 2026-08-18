<?php
declare(strict_types=1);

add_action('rest_api_init', static function (): void {
    register_rest_route('aline/v1', '/health', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => static fn (): WP_REST_Response => new WP_REST_Response([
            'status' => 'ok', 'plugin' => 'aline-portfolio-tools', 'wordpress' => get_bloginfo('version'), 'timestamp' => gmdate('c')
        ])
    ]);
});
