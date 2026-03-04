namespace Compactador_de_BackingTracks
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            button1 = new Button();
            button2 = new Button();
            checkBox1 = new CheckBox();
            textBox1 = new TextBox();
            button3 = new Button();
            button4 = new Button();
            textBox2 = new TextBox();
            textBox3 = new TextBox();
            button5 = new Button();
            button6 = new Button();
            SuspendLayout();
            // 
            // button1
            // 
            button1.BackColor = Color.FromArgb(192, 255, 192);
            button1.FlatAppearance.BorderSize = 0;
            button1.FlatStyle = FlatStyle.Flat;
            button1.Location = new Point(11, 85);
            button1.Name = "button1";
            button1.Size = new Size(370, 23);
            button1.TabIndex = 0;
            button1.Text = "Compactar somente os MP3 da pasta (.m4a)";
            button1.UseVisualStyleBackColor = false;
            button1.Click += button1_Click;
            // 
            // button2
            // 
            button2.BackColor = Color.FromArgb(192, 255, 192);
            button2.FlatAppearance.BorderSize = 0;
            button2.FlatStyle = FlatStyle.Flat;
            button2.Location = new Point(11, 114);
            button2.Name = "button2";
            button2.Size = new Size(370, 23);
            button2.TabIndex = 1;
            button2.Text = "Compactar TODAS musicas da pasta (.m4a)";
            button2.UseVisualStyleBackColor = false;
            button2.Click += button2_Click;
            // 
            // checkBox1
            // 
            checkBox1.AutoSize = true;
            checkBox1.Location = new Point(11, 143);
            checkBox1.Name = "checkBox1";
            checkBox1.Size = new Size(244, 19);
            checkBox1.TabIndex = 2;
            checkBox1.Text = "Apagar arquivo original apos a conversão";
            checkBox1.UseVisualStyleBackColor = true;
            // 
            // textBox1
            // 
            textBox1.Location = new Point(11, 12);
            textBox1.Name = "textBox1";
            textBox1.Size = new Size(195, 23);
            textBox1.TabIndex = 3;
            // 
            // button3
            // 
            button3.BackColor = Color.FromArgb(192, 255, 192);
            button3.FlatAppearance.BorderSize = 0;
            button3.FlatStyle = FlatStyle.Flat;
            button3.Location = new Point(212, 12);
            button3.Name = "button3";
            button3.Size = new Size(169, 23);
            button3.TabIndex = 4;
            button3.Text = "Buscar pasta das musicas";
            button3.UseVisualStyleBackColor = false;
            button3.Click += button3_Click;
            // 
            // button4
            // 
            button4.BackColor = Color.FromArgb(192, 255, 192);
            button4.FlatAppearance.BorderSize = 0;
            button4.FlatStyle = FlatStyle.Flat;
            button4.Location = new Point(212, 41);
            button4.Name = "button4";
            button4.Size = new Size(169, 23);
            button4.TabIndex = 6;
            button4.Text = "Buscar pasta das conversoes";
            button4.UseVisualStyleBackColor = false;
            button4.Click += button4_Click;
            // 
            // textBox2
            // 
            textBox2.Location = new Point(11, 41);
            textBox2.Name = "textBox2";
            textBox2.Size = new Size(195, 23);
            textBox2.TabIndex = 5;
            // 
            // textBox3
            // 
            textBox3.Location = new Point(11, 168);
            textBox3.MaxLength = 999999999;
            textBox3.Multiline = true;
            textBox3.Name = "textBox3";
            textBox3.Size = new Size(370, 138);
            textBox3.TabIndex = 7;
            // 
            // button5
            // 
            button5.BackColor = Color.FromArgb(192, 255, 255);
            button5.FlatAppearance.BorderSize = 0;
            button5.FlatStyle = FlatStyle.Flat;
            button5.Location = new Point(11, 312);
            button5.Name = "button5";
            button5.Size = new Size(370, 23);
            button5.TabIndex = 8;
            button5.Text = "Salvar arquivo .BAT";
            button5.UseVisualStyleBackColor = false;
            button5.Click += button5_Click;
            // 
            // button6
            // 
            button6.BackColor = Color.IndianRed;
            button6.FlatAppearance.BorderSize = 0;
            button6.FlatStyle = FlatStyle.Flat;
            button6.ForeColor = Color.White;
            button6.Location = new Point(12, 341);
            button6.Name = "button6";
            button6.Size = new Size(370, 23);
            button6.TabIndex = 9;
            button6.Text = "Testar arquivos convertidos";
            button6.UseVisualStyleBackColor = false;
            button6.Click += button6_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = SystemColors.ControlDark;
            ClientSize = new Size(390, 374);
            Controls.Add(button6);
            Controls.Add(button5);
            Controls.Add(textBox3);
            Controls.Add(button4);
            Controls.Add(textBox2);
            Controls.Add(button3);
            Controls.Add(textBox1);
            Controls.Add(checkBox1);
            Controls.Add(button2);
            Controls.Add(button1);
            Name = "Form1";
            ShowIcon = false;
            StartPosition = FormStartPosition.CenterScreen;
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Button button1;
        private Button button2;
        private CheckBox checkBox1;
        private TextBox textBox1;
        private Button button3;
        private Button button4;
        private TextBox textBox2;
        private TextBox textBox3;
        private Button button5;
        private Button button6;
    }
}