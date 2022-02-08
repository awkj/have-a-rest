#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;
use tauri::{CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem};

fn main() {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let hide = CustomMenuItem::new("hide".to_string(), "Hide");
  let prefer = CustomMenuItem::new("click".to_string(), "Prefer[No Implementation]");
  let tray_menu = SystemTrayMenu::new()
    .add_item(prefer)
    .add_item(hide)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(quit); // insert the menu items here
  tauri::Builder::default()
    .system_tray(SystemTray::new().with_menu(tray_menu))
    .on_system_tray_event(|app, event| match event {
      SystemTrayEvent::LeftClick {
        position: _,
        size: _,
        ..
      } => {
        println!("system tray received a left click");
      }
      SystemTrayEvent::RightClick {
        position: _,
        size: _,
        ..
      } => {
        println!("system tray received a right click");
      }
      SystemTrayEvent::DoubleClick {
        position: _,
        size: _,
        ..
      } => {
        println!("system tray received a double click");
      }
      SystemTrayEvent::MenuItemClick { id, .. } => {
        let item_handle = app.tray_handle().get_item(&id);
        match id.as_str() {
          "quit" => {
            println!("quit");
            std::process::exit(0);
          }
          "hide" => {
            println!("hide");
            let window = app.get_window("main").unwrap();
            if window.is_visible().unwrap() {
              window.hide().unwrap();
              item_handle.set_title("Show").unwrap()
            } else {
              window.set_focus().unwrap();
              item_handle.set_title("Hide").unwrap()
            }
          }
          _ => {}
        }
      }
      _ => {}
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
