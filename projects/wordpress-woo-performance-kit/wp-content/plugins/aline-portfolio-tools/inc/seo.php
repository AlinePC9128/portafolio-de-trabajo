<?php
declare(strict_types=1);

add_action('wp_head', static function (): void { if (!is_admin()) echo '<meta name="theme-color" content="#08111f">' . PHP_EOL; });
add_filter('document_title_parts', static function (array $parts): array { if (!empty($parts['title'])) $parts['title'] .= ' | Aline Portfolio Tools'; return $parts; });
