<?php
/**
 * Plugin Name: Aline Portfolio Tools
 * Description: REST health check, SEO helpers and WooCommerce hooks for portfolio demonstration.
 * Version: 1.0.0
 * Author: Aline Peña
 */
declare(strict_types=1);

if (!defined('ABSPATH')) exit;

require_once __DIR__ . '/inc/rest.php';
require_once __DIR__ . '/inc/seo.php';
require_once __DIR__ . '/inc/woo.php';

add_action('wp_enqueue_scripts', static function (): void {
    wp_register_style('aline-portfolio-tools', false, [], '1.0.0');
    wp_enqueue_style('aline-portfolio-tools');
    wp_add_inline_style('aline-portfolio-tools', '.aline-performance-badge{display:inline-flex;gap:.4rem;padding:.35rem .55rem;border-radius:99px;background:#e7f8ef;color:#146b40;font-size:.75rem}');
});
