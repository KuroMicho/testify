const { Builder } = require("selenium-webdriver");
const edge = require("selenium-webdriver/edge");

const LoginPage = require("./pages/LoginPage");
const DashboardPage = require("./pages/DashboardPage");

const pausar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runAllTests() {
  let options = new edge.Options();
  let driver = await new Builder()
    .forBrowser("MicrosoftEdge")
    .setEdgeOptions(options)
    .build();

  try {
    const loginPage = new LoginPage(driver);
    const dashboardPage = new DashboardPage(driver);

    console.log("🚀 Iniciando navegador Edge...");

    // --- PRUEBA 1: LOGIN ---
    await loginPage.open();
    await pausar(1500);

    console.log("✍️ Escribiendo credenciales y haciendo clic en Login...");
    await loginPage.login("admin@cerveceria.com", "123456");
    await pausar(1500);

    await dashboardPage.waitForDashboard();
    console.log("✅ Flujo Login: Exitoso");
    await pausar(1500);

    // --- PRUEBA 2: CARGA DE CATÁLOGO ---
    console.log("🖱️ Intentando hacer clic en el botón de cargar catálogo...");
    await dashboardPage.loadCatalog();
    await pausar(1500);

    let count = await dashboardPage.getBeerCount();
    if (count > 0) {
      console.log(
        `✅ Flujo Catálogo: Exitoso. Se renderizaron ${count} cervezas.`,
      );
    }
  } catch (error) {
    console.error("❌ Error en la suite:", error);
  } finally {
    console.log("🏁 Finalizando pruebas, cerrando Edge en 3 segundos...");
    await pausar(3000);
    await driver.quit();
  }
}

runAllTests();
