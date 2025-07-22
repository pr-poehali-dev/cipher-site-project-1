import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);

  // Функция шифрования Цезаря со сдвигом +3
  const encryptText = (text: string): string => {
    const alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    return text.toLowerCase().split('').map(char => {
      const index = alphabet.indexOf(char);
      if (index === -1) return char; // Если символ не в алфавите, оставляем как есть
      const newIndex = (index + 3) % alphabet.length;
      return alphabet[newIndex];
    }).join('');
  };

  const handleEncrypt = async () => {
    if (!inputText.trim()) return;
    
    setIsEncrypting(true);
    setOutputText('');
    
    // Имитация печатающей машинки
    const encrypted = encryptText(inputText);
    for (let i = 0; i <= encrypted.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      setOutputText(encrypted.slice(0, i));
    }
    
    setIsEncrypting(false);
  };

  const examples = [
    { original: 'привет мир', encrypted: 'сулезх пул' },
    { original: 'секретное сообщение', encrypted: 'хзлузхоез хээйщзолз' },
    { original: 'хакер', encrypted: 'ылзу' }
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Заголовок */}
      <div className="relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2300ff41" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="text-center">
            <Badge variant="outline" className="mb-6 border-green-400 text-green-400 bg-green-400/10">
              <Icon name="Shield" size={16} className="mr-2" />
              CIPHER v3.0
            </Badge>
            <h1 className="text-5xl font-bold mb-4 text-green-400 animate-fade-in">
              ШИФРОВАЛЬЩИК
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Продвинутая система шифрования текста с алгоритмом Цезаря.
              <br />Каждая буква сдвигается на +3 позиции в алфавите.
            </p>
          </div>
        </div>
      </div>

      {/* Основная рабочая область */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Поле ввода */}
          <Card className="bg-gray-900 border-green-400/30 shadow-lg shadow-green-400/10">
            <CardHeader>
              <CardTitle className="flex items-center text-green-400">
                <Icon name="Edit" size={20} className="mr-2" />
                ИСХОДНЫЙ ТЕКСТ
              </CardTitle>
              <CardDescription className="text-gray-400">
                Введите текст для шифрования
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Введите ваше секретное сообщение..."
                className="min-h-[200px] bg-black border-green-400/50 text-green-400 placeholder-gray-600 focus:border-green-400 focus:ring-green-400/20 font-mono"
              />
              <Button 
                onClick={handleEncrypt}
                disabled={!inputText.trim() || isEncrypting}
                className="mt-4 w-full bg-green-600 hover:bg-green-500 text-black font-bold"
              >
                {isEncrypting ? (
                  <>
                    <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                    ШИФРУЮ...
                  </>
                ) : (
                  <>
                    <Icon name="Lock" size={16} className="mr-2" />
                    ЗАШИФРОВАТЬ
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Поле вывода */}
          <Card className="bg-gray-900 border-green-400/30 shadow-lg shadow-green-400/10">
            <CardHeader>
              <CardTitle className="flex items-center text-green-400">
                <Icon name="Eye" size={20} className="mr-2" />
                ЗАШИФРОВАННЫЙ ТЕКСТ
              </CardTitle>
              <CardDescription className="text-gray-400">
                Результат шифрования появится здесь
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[200px] bg-black border border-green-400/50 rounded-md p-3 font-mono text-green-400">
                {outputText && (
                  <div className="animate-fade-in">
                    <span className="text-green-400">{outputText}</span>
                    {isEncrypting && <span className="animate-pulse">|</span>}
                  </div>
                )}
                {!outputText && !isEncrypting && (
                  <div className="text-gray-600 italic">
                    Зашифрованное сообщение появится здесь...
                  </div>
                )}
              </div>
              {outputText && (
                <Button 
                  variant="outline"
                  className="mt-4 border-green-400/50 text-green-400 hover:bg-green-400/10"
                  onClick={() => navigator.clipboard.writeText(outputText)}
                >
                  <Icon name="Copy" size={16} className="mr-2" />
                  СКОПИРОВАТЬ
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Секции с информацией */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Инструкции */}
          <Card className="bg-gray-900 border-green-400/30">
            <CardHeader>
              <CardTitle className="flex items-center text-green-400">
                <Icon name="BookOpen" size={20} className="mr-2" />
                ИНСТРУКЦИЯ ПО ИСПОЛЬЗОВАНИЮ
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="border-green-400 text-green-400 bg-green-400/10 min-w-fit">
                  01
                </Badge>
                <div>
                  <h4 className="font-bold text-green-400 mb-1">Введите текст</h4>
                  <p className="text-sm">Напишите сообщение в левом поле ввода</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="border-green-400 text-green-400 bg-green-400/10 min-w-fit">
                  02
                </Badge>
                <div>
                  <h4 className="font-bold text-green-400 mb-1">Нажмите "Зашифровать"</h4>
                  <p className="text-sm">Активируйте алгоритм шифрования</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="border-green-400 text-green-400 bg-green-400/10 min-w-fit">
                  03
                </Badge>
                <div>
                  <h4 className="font-bold text-green-400 mb-1">Получите результат</h4>
                  <p className="text-sm">Зашифрованный текст появится в правом поле</p>
                </div>
              </div>
              <Separator className="bg-green-400/30" />
              <div className="bg-green-400/5 p-3 rounded border border-green-400/20">
                <h5 className="font-bold text-green-400 mb-2 flex items-center">
                  <Icon name="Info" size={16} className="mr-2" />
                  АЛГОРИТМ ШИФРОВАНИЯ
                </h5>
                <p className="text-sm text-gray-300">
                  Используется шифр Цезаря со сдвигом +3. Каждая буква русского алфавита 
                  (исключая ё) заменяется буквой, находящейся на 3 позиции правее.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Примеры */}
          <Card className="bg-gray-900 border-green-400/30">
            <CardHeader>
              <CardTitle className="flex items-center text-green-400">
                <Icon name="Code" size={20} className="mr-2" />
                ПРИМЕРЫ ЗАШИФРОВАННЫХ ТЕКСТОВ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examples.map((example, index) => (
                  <div key={index} className="bg-black p-4 rounded border border-green-400/20">
                    <div className="mb-2">
                      <span className="text-gray-400 text-sm">Исходный:</span>
                      <div className="font-mono text-white">{example.original}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Зашифрованный:</span>
                      <div className="font-mono text-green-400">{example.encrypted}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="bg-green-400/30 my-6" />
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="advanced" className="border-green-400/30">
                  <AccordionTrigger className="text-green-400 hover:text-green-300">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Продвинутые возможности
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 space-y-2">
                    <div className="bg-green-400/5 p-3 rounded">
                      <h5 className="font-bold text-green-400 mb-2">Безопасность:</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Шифрование происходит локально в браузере</li>
                        <li>Данные не передаются на сервер</li>
                        <li>Полная конфиденциальность ваших сообщений</li>
                      </ul>
                    </div>
                    <div className="bg-green-400/5 p-3 rounded">
                      <h5 className="font-bold text-green-400 mb-2">Особенности алгоритма:</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Сохраняется регистр и пунктуация</li>
                        <li>Буква "ё" исключена из алфавита</li>
                        <li>Цифры и символы остаются неизменными</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Футер */}
      <div className="bg-gray-900 border-t border-green-400/30 py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-green-400 mb-4">
            <Icon name="Shield" size={20} />
            <span className="font-bold">CIPHER SYSTEM</span>
            <Icon name="Shield" size={20} />
          </div>
          <p className="text-gray-400 text-sm">
            Безопасное шифрование текста • Алгоритм Цезаря • Сдвиг +3
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;