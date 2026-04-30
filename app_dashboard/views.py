import pandas as pd
from django.shortcuts import render
from django.http import JsonResponse

SHEET_URL = "https://docs.google.com/spreadsheets/d/15moUGBjKqJdiSaDBcGtJIk1Aoy6qOh8ldfRzQLx3cGM/export?format=csv"

def get_dashboard_data():
    try:
        # Lê a planilha diretamente do Google Sheets
        df = pd.read_csv(SHEET_URL)
        df = df.fillna("")
        
        # Converte colunas numéricas
        df['Preço'] = pd.to_numeric(df['Preço'], errors='coerce').fillna(0)
        df['Estoque'] = pd.to_numeric(df['Estoque'], errors='coerce').fillna(0).astype(int)
        
        total_produtos = len(df)
        total_estoque = int(df['Estoque'].sum())
        valor_total_estoque = float((df['Preço'] * df['Estoque']).sum())
        preco_medio = float(df['Preço'].mean()) if total_produtos > 0 else 0
        
        estoque_baixo = int((df['Estoque'] < 10).sum())
        
        # Agrupa categorias
        if not df.empty and 'Categoria' in df.columns:
            cat_counts = df.groupby('Categoria').size().reset_index(name='total')
            produtos_por_categoria = cat_counts.rename(columns={'Categoria': 'categoria'}).to_dict('records')
        else:
            produtos_por_categoria = []
            
        # Agrupa marcas top 5
        if not df.empty and 'Marca' in df.columns:
            marca_counts = df.groupby('Marca').size().reset_index(name='total')
            marcas_top = marca_counts.sort_values(by='total', ascending=False).head(5).rename(columns={'Marca': 'marca'}).to_dict('records')
        else:
            marcas_top = []
        
        # Renomeia as colunas para o que o template espera (dashboard.html)
        col_mapping = {
            'ID': 'id_produto',
            'Nome': 'nome',
            'Categoria': 'categoria',
            'Marca': 'marca',
            'Preço': 'preco',
            'Estoque': 'estoque',
            'Data Cadastro': 'data_cadastro',
            'Ativo': 'ativo'
        }
        df_produtos = df.rename(columns=col_mapping)
        
        # Converte 'Sim'/'Não' para booleano
        if 'ativo' in df_produtos.columns:
            df_produtos['ativo'] = df_produtos['ativo'].apply(lambda x: True if str(x).lower() == 'sim' else False)
        
        produtos = df_produtos.to_dict('records')
        
        return {
            "total_produtos": total_produtos,
            "total_estoque": total_estoque,
            "valor_total_estoque": round(valor_total_estoque, 2),
            "preco_medio": round(preco_medio, 2),
            "produtos_por_categoria": produtos_por_categoria,
            "marcas_top": marcas_top,
            "estoque_baixo": estoque_baixo,
            "produtos": produtos,
            "erro": None
        }
    except Exception as e:
        return {"erro": str(e), "produtos": [], "total_produtos": 0, "total_estoque": 0, "valor_total_estoque": 0, "preco_medio": 0, "produtos_por_categoria": [], "marcas_top": [], "estoque_baixo": 0}

def dashboard(request):
    context = get_dashboard_data()
    return render(request, "app_dashboard/dashboard.html", context)

def atualizar_dados(request):
    # O front-end agora apenas recarrega a página para pegar os dados frescos.
    # Essa rota pode apenas retornar sucesso.
    return JsonResponse({"importados": "Dados atualizados direto da nuvem!", "atualizados": "Recarregando página..."})
