let
  nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-24.05";
  pkgs = import nixpkgs { config = {}; overlays = []; };
in
pkgs.mkShell {
  name = "web-dev";
  # Figure how to add LSP here
  buildInputs = with pkgs; [
    hugo
  ];
  nativeBuildInputs = with pkgs; [
    pkg-config
    python313
  ];
  shellHook = ''
    zsh
    !echo Starting web dev shell
  '';
}
