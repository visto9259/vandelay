<?php

declare(strict_types=1);

namespace App\Forms;

use Laminas\Form\Element\Submit;
use Laminas\Form\Element\Text;
use Laminas\Form\Form;
use Laminas\InputFilter\InputFilter;

final class Connect extends Form
{
    public function __construct($name = null, array $options = [])
    {
        parent::__construct($name, $options);
        $this->add([
            'name' => 'client_id',
            'type' => Text::class,
            'options' => [
                'label' => 'Client ID:',
            ],
            'attributes' => [
                'required' => true,
            ],
        ]);
        $this->add([
            'name' => 'client_secret',
            'type' => Text::class,
            'options' => [
                'label' => 'Client Secret:',
            ],
            'attributes' => [
                'required' => true,
            ],
        ]);
        $this->add([
            'name' => 'submit',
            'type' => Submit::class,
            'value' => 'connect',
            'options' => [
                'label' => 'Connect',
                'value' => 'Connect',
            ],
            'attributes' => [
                'value' => 'Connect',
            ],
        ]);

        $inputFiler = new InputFilter();
        $inputFiler->add([
            'name' => 'client_id',
            'required' => true,
            'filters' => [
                ['name' => 'StringTrim'],
            ],
            'validators' => []
        ]);
        $inputFiler->add([
            'name' => 'client_secret',
            'required' => true,
            'filters' => [
                ['name' => 'StringTrim'],
            ],
            'validators' => []
        ]);
        $this->setInputFilter($inputFiler);
    }
}
