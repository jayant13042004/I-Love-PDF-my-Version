# PDF Toolkit Web App

A powerful, privacy-focused, and client-side PDF manipulation studio built with modern web technologies.

![PDF Toolkit](https://placehold.co/600x400?text=PDF+Toolkit+Preview)

## 🚀 Overview

**PDF Toolkit** is a web application designed to handle all your PDF needs directly in your browser. Unlike traditional tools that upload your sensitive documents to a server, this app uses advanced WebAssembly libraries to process everything locally on your device. This ensures:

*   **100% Privacy**: Your files never leave your computer.
*   **Zero Latency**: No upload or download times.
*   **Unlimited Usage**: No daily limits or paywalls.

## ✨ Features

*   **🔗 Merge PDFs**: Combine multiple PDF files into a single document with drag-and-drop reordering.
*   **📉 Compress PDFs**: Reduce file size with adjustable compression levels (Low, Medium, High).
*   **🖼️ PDF to JPG**: Convert PDF pages into high-quality images.
*   **📷 JPG to PDF**: Create PDFs from a collection of images.
*   **✂️ Remove Pages**: Visually select and delete unwanted pages from your documents.
*   **💧 Watermark**: Add text or image watermarks with custom positioning and opacity.
*   **📱 Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom glassmorphism design system.
*   **Language**: TypeScript
*   **PDF Processing**: 
    *   `pdf-lib` for document manipulation (merging, modifying).
    *   `pdfjs-dist` for rendering and rasterization.
*   **UI Components**: `react-dropzone` for uploads, `lucide-react` for icons.

## 🏁 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository** (or download the source code):
    ```bash
    git clone https://github.com/jayant13042004/PDF-converter.git
    cd PDF-converter
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Visit [http://localhost:3000](http://localhost:3000) to see the app in action.

## 🚢 Building for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the tool, please:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
