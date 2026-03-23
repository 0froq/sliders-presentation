let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/2_areas/research/pre_slide
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +22 pages/pre-032226.md
badd +19 uno.config.mts
badd +26 styles/base.css
badd +33 slides.md
badd +30 pages/pre-032226-lake-warm-zh.md
badd +1 styles/index.ts
argglobal
%argdel
edit pages/pre-032226-lake-warm-zh.md
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
balt styles/base.css
setlocal foldmethod=expr
setlocal foldexpr=v:lua.vim.treesitter.foldexpr()
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
14
sil! normal! zo
18
sil! normal! zo
32
sil! normal! zo
51
sil! normal! zo
60
sil! normal! zo
60
sil! normal! zo
62
sil! normal! zo
107
sil! normal! zo
109
sil! normal! zo
114
sil! normal! zo
52
sil! normal! zo
54
sil! normal! zo
99
sil! normal! zo
101
sil! normal! zo
106
sil! normal! zo
154
sil! normal! zo
156
sil! normal! zo
195
sil! normal! zo
197
sil! normal! zo
197
sil! normal! zo
204
sil! normal! zo
let s:l = 30 - ((15 * winheight(0) + 12) / 25)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 30
normal! 048|
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
