<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="row">
        <div class="col-md-4">
            <button id="scanButton">Leer QR</button>
        </div>
    </div>

    <div class="jumbotron">
        <div id="result"></div>
    </div>

    <script>
        const scanButton = document.getElementById('scanButton');
        const resultDiv = document.getElementById('result');

        scanButton.addEventListener('click', async () => {
            try {
                const codeReader = new ZXing.BrowserQRCodeReader();
                const result = await codeReader.decodeOnceFromVideoDevice(undefined, 'video');
                resultDiv.innerText = `Código escaneado: ${result.text}`;
            } catch (error) {
                console.error(error);
                resultDiv.innerText = 'Error al escanear el código.';
            }
        });
    </script>
    
</asp:Content>
