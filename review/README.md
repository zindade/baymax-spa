# Projeto Final — Review da `main` branch

O vosso projeto está a ficar top!  
Aqui vai uma revisão rápida do que vejo neste momento.

---

## FRONT-END

### Home Page
- Está no bom caminho — clean e funcional.  
- Problema: quando pesquiso algo diferente de *medicação*, o servidor responde com **500** (bug no `AiService` ao comunicar com a FDA, não é problema do front-end, mas visível nos logs - sem feedback para o utilizador).  
- Ao pesquisar, aparece um white square acima da resposta do bot.

### Medications
- Funciona lindamente.  
- Sugestão: melhorar o layout — neste momento parece *Windows 98 style*. Considerem usar **Bootstrap** para ficar harmonioso com o resto.

### Learn More
- O mapa está a funcionar.  
- O "Search professional" funciona com entries manuais no `professions-service.js`.  
  - Isto resolve o problema por agora, mas podiam explorar algo tipo Google Search.  
- No geral, está fixe.

### About
- Funciona bem.  
- Podia ter mais personalidade.

### Schedule
- Está muito bom. Mesmo sem comunicar com nenhuma API, dá uma boa impressão.


### Organização do Projeto
- O ficheiro `handle-baymax.question.js` faz mais sentido como service do que dentro das views.  
- Normalmente as routes mapeiam para controllers, e não diretamente para funções das views.  
  - Mas a forma como fizeram com hash-based routing também funciona.

---

## BACK-END

Super sólido. Segue bem a estrutura do **javabank**.  

Problema específico:  
- A implementação do `AiService` comunica sempre com a FDA. Já tínhamos falado disto no wrap-up como algo a resolver.

### Notas para o vosso portfólio
- Apagar todas as menções a `javabank` (ex.: exceptions, `config.properties`).  
- Criar um `config.properties.example` completo — algumas variáveis não estão definidas por defeito.  
- Fazer cleanup de classes que não estejam a ser utilizadas.

---

## Conclusão
Estão mesmo quase lá.  
Parabéns pelo excelente trabalho!
