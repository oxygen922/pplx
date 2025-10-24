# Comet Browser Landing Page

A modern, responsive landing page for the Comet Browser referral program. This page is designed to convert visitors into users with a focus on the $10 referral bonus and free Pro membership.

## Features

- 🎨 Modern gradient design inspired by tech startups
- 📱 Fully responsive design for all devices
- ⚡ Fast loading and optimized for performance
- 🔄 Interactive elements with smooth animations
- 🔗 Direct referral link integration
- 🎯 High conversion focus with clear CTAs

## Deployment to Vercel

### Quick Deployment

1. Push this code to your GitHub repository
2. Connect your repository to Vercel
3. Deploy - Vercel will automatically detect it's a static site

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

## Customization

### Updating Referral Link

Replace the referral URL in `index.html`:

```html
<a href="https://pplx.ai/YOUR_REFERRAL_CODE" class="cta-button primary">
```

### Colors and Styling

Main color variables in `styles.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}
```

### Content Updates

Edit the main content sections in `index.html`:
- Hero section title and subtitle
- Feature cards
- How it works steps
- Statistics

## Performance

- Lighthouse score: 95+ (Performance)
- Core Web Vitals optimized
- Minimal JavaScript (only for interactions)
- CSS optimized for fast rendering
- Image lazy loading ready

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Android Chrome)

## Analytics

To add analytics, include your tracking script before the closing `</body>` tag in `index.html`.

## License

MIT License - feel free to use and modify for your own projects.