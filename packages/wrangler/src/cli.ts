import "dotenv/config"; // Grab locally specified env params from a `.env` file.
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { hideBin } from "yargs/helpers";
import { FatalError } from "./errors";
import { main } from ".";

// /**
//  * https://nodejs.org/api/modules.html#loading-from-the-global-folders
//  *
//  * If the `NODE_PATH` environment variable is set to a colon-delimited list of absolute paths,
//  * then Node.js will search those paths for modules if they are not found elsewhere.
//  *
//  * On Windows, `NODE_PATH` is delimited by semicolons (;) instead of colons.
//  *
//  * `NODE_PATH` was originally created to support loading modules from varying
//  * paths before the current module resolution algorithm was defined.
//  * `NODE_PATH` is still supported, but is less necessary now that the Node.js
//  * ecosystem has settled on a convention for locating dependent modules.
//  * Sometimes deployments that rely on `NODE_PATH` show surprising behavior
//  * when people are unaware that `NODE_PATH` must be set. Sometimes a module's
//  * dependencies change, causing a different version (or even a different module)
//  * to be loaded as the `NODE_PATH` is searched.
//  *
//  * Additionally, Node.js will search in the following list of GLOBAL_FOLDERS:
//  *
//  * 1. `$HOME/.node_modules`
//  * 2. `$HOME/.node_libraries`
//  * 3. `$PREFIX/lib/node`
//  *
//  * Where `$HOME` is the user's home directory, and `$PREFIX` is the Node.js configured `node_prefix`.
//  * see: https://docs.npmjs.com/cli/v8/using-npm/config#prefix
//  */
// const GLOBAL_FOLDERS = [
//   // 1: $HOME/.node_modules
//   path.join(os.homedir(), ".node_modules"),
//   // 2. $HOME/.node_libraries
//   path.join(os.homedir(), ".node_libraries"),
//   //3. $PREFIX/lib/node (https://github.com/nodejs/node-v0.x-archive/blob/061151c/lib/module.js#L511)
//   path.resolve(process.execPath, "..", "..", "lib"),
// ].concat(
//   process.env["NODE_PATH"]?.split(os.platform() === "win32" ? ";" : ":") ?? []
// );

// const projectLocalCli = (function () {
//   try {
//     const maybeLocal = require.resolve("wrangler", {
//       // these paths are used instead of the default resolution paths, with the exception of
//       // GLOBAL_FOLDERS like $HOME/.node_modules, which are always included.
//       // Each of these paths is used as a starting point for the module resolution algorithm,
//       // meaning that the node_modules hierarchy is checked from this location.
//       paths: [process.cwd()],
//     });

//     // check if the path is actually a global install
//     if (GLOBAL_FOLDERS.some((folder) => maybeLocal.startsWith(folder))) {
//       return;
//     }

//     return maybeLocal;
//   } catch (e) {
//     // module not found error from require.resolve
//     // there isn't a local version
//   }
// })();

const projectLocalCli = "Running global version!";

console.log(projectLocalCli);

main(hideBin(process.argv)).catch((e) => {
  // The logging of any error that was thrown from `main()` is handled in the `yargs.fail()` handler.
  // Here we just want to ensure that the process exits with a non-zero code.
  // We don't want to do this inside the `main()` function, since that would kill the process when running our tests.
  const exitCode = (e instanceof FatalError && e.code) || 1;
  process.exit(exitCode);
});
