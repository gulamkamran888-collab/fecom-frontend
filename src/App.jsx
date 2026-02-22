// import React from "react";
// import Headers from "./components/headers/Headers";
// import Pages from "./components/mainpages/Pages";
// import { BrowserRouter } from "react-router-dom";
// import { DataProvider } from "./GlobalState";
// import Footer from "./components/footer/Footer";

// function App() {
//   return (
//     <DataProvider>
//       <BrowserRouter>
//         <div className="App">
//           <Headers />
//           <Pages />
//           <Footer />
//         </div>
//       </BrowserRouter>
//     </DataProvider>
//   );
// }

// export default App;

import React from "react";
import Headers from "./components/headers/Headers";
import Pages from "./components/mainpages/Pages";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800 antialiased">
          {/* Soft background glow */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl"></div>
          </div>

          {/* Layout wrapper */}
          <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-slate-200 shadow-sm transition-all duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Headers />
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 transition-all duration-300">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-10 hover:shadow-2xl transition-shadow duration-500 ease-out">
                  <Pages />
                </div>
              </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white/70 backdrop-blur-md shadow-inner">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Footer />
              </div>
            </footer>
          </div>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
