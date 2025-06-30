# 🤖 Chatbot Embed Demo

This directory contains demo pages showcasing the chatbot embed library functionality.

## 📁 Files

- `index.html` - Full chatbot demo (embedded in page)
- `bubble-demo.html` - Bubble chatbot demo (floating widget)
- `README.md` - This documentation file

## 🚀 Running the Demo

### Option 1: Quick Demo

```bash
pnpm demo
```

This will build the library and start the development server.

### Option 2: Manual Steps

```bash
# Build the library first
pnpm build

# Start the development server
pnpm dev
```

Then visit:

- **Full Chatbot Demo**: http://localhost:5678/ (or http://localhost:5678/index.html)
- **Bubble Chatbot Demo**: http://localhost:5678/bubble-demo.html
- **Library Bundle**: http://localhost:5678/web.js

## 🎯 What the Demos Show

The demo pages demonstrate:

### Full Chatbot Demo (`/`)

1. **Embedded Chatbot** - Complete chatbot embed with custom theming
2. **Integration Code Examples** - How to integrate the library into your website
3. **Live Configuration** - Real-time chatbot with sample configuration

### Bubble Chatbot Demo (`/bubble-demo.html`)

1. **Floating Widget** - Bubble chatbot that floats on your website
2. **Bubble vs Full Comparison** - Side-by-side feature comparison
3. **Button Customization** - Different themes and positioning options

## 📝 Demo Configuration

The demo uses these sample settings:

```javascript
{
  chatflowid: '91e9c803-5169-4db9-8207-3c0915d71c5f',
  apiHost: 'http://localhost:3000',
  theme: {
    tooltip: {
      showTooltip: true,
      tooltipMessage: 'Hi There 👋!',
      // ... more settings
    }
  }
}
```

## 🔧 Customizing the Demo

To modify the demo:

1. Edit `demo/index.html` directly
2. Changes will be reflected when you reload the page
3. The dev server includes live reload for convenience

## 📦 Production Usage

For production integration, import the library from CDN:

### Full Chatbot (embedded in page)

```html
<n-fullchatbot></n-fullchatbot>
<script type="module">
  import Chatbot from 'https://cdn.jsdelivr.net/npm/bitflow-chatbot-embed/dist/web.js';

  Chatbot.initFull({
    chatflowid: 'your-chatflow-id',
    apiHost: 'https://your-api-host.com',
    // Your configuration
  });
</script>
```

### Bubble Chatbot (floating widget)

```html
<script type="module">
  import Chatbot from 'https://cdn.jsdelivr.net/npm/bitflow-chatbot-embed/dist/web.js';

  // Note: No HTML element needed - created automatically
  Chatbot.init({
    chatflowid: 'your-chatflow-id',
    apiHost: 'https://your-api-host.com',
    // Your configuration
  });
</script>
```

## 🎨 Adding More Demos

To add additional demo pages:

1. Create new HTML files in this directory (e.g., `bubble-demo.html`)
2. Import the library: `import Chatbot from './web.js'`
3. Access via: `http://localhost:5678/bubble-demo.html`
