from django.shortcuts import render
from .models import Professor, Subject
from .serializers import ProfessorSerializer, SubjectSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

# TEACHERS

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_professores(request):
    if request.method == 'GET':
        queryset = Professor.objects.all()
        serializer = ProfessorSerializer(queryset, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ProfessorSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status = status.HTTP_400_BAD_REQUEST)

class ProfessoresView(ListCreateAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    permission_classes = [IsAuthenticated]

class ProfessoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    permission_classes = [IsAuthenticated]

# SUBJECTS
        
class SubjectsView(ListCreateAPIView):

    """
    Método responsável pela criação da disciplina
    """

    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        """
        Sobrescreve o método CREATE para retornar o status e mensagens personalizadas
        """

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)



class SubjectsDetailView(RetrieveUpdateDestroyAPIView):

    """
    Método responsável pelo PUT/DELETE, ou seja, atualiza e deleta disciplinas do banco de dados
    """

    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        """
        Sobrescreve o método UPDATE para retornar status e mensagens personalizadas
        """

        # Obtém a instância do objeto baseado no pk
        instance = self.get_object()

        # Passa a instância para o serializer, com os dados recebidos na requisição
        serializer = self.get_serializer(instance, data=request.data)

        # Valida e salva a instância
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        """
        Sobrescreve o método DELETE para retornar status e mensagens personalizadas
        """

        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

