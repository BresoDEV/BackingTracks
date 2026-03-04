using System.IO;

namespace Compactador_de_BackingTracks
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            using (FolderBrowserDialog dialog = new FolderBrowserDialog())
            {
                if (dialog.ShowDialog() == DialogResult.OK)
                {
                    textBox1.Text = dialog.SelectedPath;
                }
            }
        }

        private void button4_Click(object sender, EventArgs e)
        {
            using (FolderBrowserDialog dialog = new FolderBrowserDialog())
            {
                if (dialog.ShowDialog() == DialogResult.OK)
                {
                    textBox2.Text = dialog.SelectedPath;
                }
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {

            var arquivosTxt = Directory.GetFiles(textBox1.Text, "*.mp3", SearchOption.TopDirectoryOnly);

            string s = "";
            foreach (var arquivo in arquivosTxt)
            {

                string novoArquivo = "";


                novoArquivo = Path.GetFileName(Path.ChangeExtension(arquivo, ".m4a"));

                s += "ffmpeg -i \"" + arquivo + "\" -ac 1 -ar 22050 -c:a aac -b:a 48k \"" + Path.Combine(textBox2.Text, novoArquivo) + "\"" + Environment.NewLine;
                if (checkBox1.Checked)
                {
                    s += "del \"" + arquivo + "\"" + Environment.NewLine;
                }
            }

            textBox3.Text = s;
        }

        private void button6_Click(object sender, EventArgs e)
        {

            var arquivosTxt = Directory.GetFiles(textBox2.Text, "*.m4a", SearchOption.TopDirectoryOnly);

            string s = "";
            int ct = 0;
            foreach (var arquivo in arquivosTxt)
            {
                if (new FileInfo(arquivo).Length == 0)
                {
                    ct++;
                    s += Path.GetFileName(arquivo) + Environment.NewLine;
                }
            }
            if (ct > 0)
            {
                MessageBox.Show($"Foram encontrados {ct} musicas com problemas:\n {s}");
            }
            else
            {
                MessageBox.Show($"Não foram encontrados arquivos com problemas");
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            var arquivosTxt = Directory.GetFiles(textBox1.Text, "*.*", SearchOption.TopDirectoryOnly);

            string s = "";
            foreach (var arquivo in arquivosTxt)
            {

                string novoArquivo = "";


                novoArquivo = Path.GetFileName(Path.ChangeExtension(arquivo, ".m4a"));

                s += "ffmpeg -i \"" + arquivo + "\" -ac 1 -ar 22050 -c:a aac -b:a 48k \"" + Path.Combine(textBox2.Text, novoArquivo) + "\"" + Environment.NewLine;
                if (checkBox1.Checked)
                {
                    s += "del \"" + arquivo + "\"" + Environment.NewLine;
                }
            }

            textBox3.Text = s;
        }

        private void button5_Click(object sender, EventArgs e)
        {
            using(SaveFileDialog s = new SaveFileDialog())
            {
                s.FileName = "Script.bat";
                if(s.ShowDialog() == DialogResult.OK)
                {
                    File.Create(s.FileName+".bat").Close();
                    File.WriteAllText(s.FileName + ".bat", textBox3.Text);
                }
            }
        }
    }
}