// Karma test shim to fix standalone component issue in tests
(function () {
  const originalConfigureTestingModule = TestBed.configureTestingModule;

  TestBed.configureTestingModule = function (moduleDef) {
    // Force all declared components to be non-standalone
    if (moduleDef.declarations) {
      moduleDef.declarations.forEach((comp) => {
        if (comp && typeof comp === "function") {
          const metadata = comp.__annotations__ || [];
          metadata.forEach((annotation) => {
            if (annotation.standalone === undefined) {
              annotation.standalone = false;
            }
          });
        }
      });
    }
    return originalConfigureTestingModule.call(this, moduleDef);
  };
})();
